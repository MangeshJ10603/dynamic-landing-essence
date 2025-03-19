
import { User } from "../types";

// Trie Node class for efficient prefix-based search
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  userIds: Set<number>;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.userIds = new Set();
  }
}

// Trie data structure for efficient search
class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word and its associated user ID into the trie
  insert(word: string, userId: number): void {
    let current = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
      current.userIds.add(userId);
    }
    current.isEndOfWord = true;
  }

  // Search for all user IDs matching the given prefix
  search(prefix: string): Set<number> {
    let current = this.root;
    const lowerPrefix = prefix.toLowerCase();

    for (const char of lowerPrefix) {
      if (!current.children.has(char)) {
        return new Set();
      }
      current = current.children.get(char)!;
    }

    return current.userIds;
  }
}

// Build a trie data structure from a list of users
export const buildUserTrie = (users: User[]): Trie => {
  const trie = new Trie();
  
  users.forEach(user => {
    // Insert name
    const words = user.name.split(' ');
    words.forEach(word => {
      trie.insert(word, user.id);
    });
    
    // Insert username
    trie.insert(user.username, user.id);
    
    // Insert email prefix (before @)
    const emailPrefix = user.email.split('@')[0];
    trie.insert(emailPrefix, user.id);
  });
  
  return trie;
};

// Search users using the trie by a search term
export const searchUsers = (trie: Trie, users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) {
    return users;
  }
  
  const matchingUserIds = trie.search(searchTerm.trim());
  
  return users.filter(user => matchingUserIds.has(user.id));
};
