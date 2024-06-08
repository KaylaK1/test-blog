// The context API shares data throughout the component tree
import { createContext } from 'react';

// Initializes the context with default value
// Since this is a global value, provide it in _app.js - wrapping the child components - so they can access it
export const UserContext = createContext({ user: null, username: null });