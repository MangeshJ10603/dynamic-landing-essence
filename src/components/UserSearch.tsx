
import { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { User } from '../types';
import { buildUserTrie, searchUsers } from '../utils/searchUtils';

const UserSearch = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const trieRef = useRef<any>(null);
  const [visibleSection, setVisibleSection] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        
        // Build the trie data structure for efficient search
        trieRef.current = buildUserTrie(data);
        
      } catch (err) {
        setError('Error loading users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleSection(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (!trieRef.current || !users.length) return;
    
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const results = searchUsers(trieRef.current, users, searchTerm);
      setFilteredUsers(results);
    }
  };

  return (
    <section id="users" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            Our Users
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Meet Our Community
          </h2>
          <p className="text-gray-600 text-lg text-balance">
            Search through our user database with our lightning-fast search algorithm
          </p>
        </div>
        
        <div className={`transition-all duration-700 ${visibleSection ? 'opacity-100' : 'opacity-0'}`}>
          <SearchBar onSearch={handleSearch} />
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div 
                    key={user.id}
                    className={`glass-card rounded-xl p-6 transition-all duration-500 ease-out`}
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      opacity: visibleSection ? 1 : 0,
                      transform: visibleSection ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-gray-500">@{user.username}</p>
                        <p className="text-gray-600 mt-2">{user.email}</p>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">{user.company.name}</p>
                          <p className="text-sm text-gray-500 italic">"{user.company.catchPhrase}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  No users found matching your search. Try a different term.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserSearch;
