# Christoffel - Fine Dining Restaurant App

A comprehensive React Native mobile application for restaurant menu management and ordering, built with TypeScript and Expo.

## Student Information
- **Student Name**: [Arsene B Tshibanda]
- **Student Number**: [ST10497531]
- **Course**: Portfolio of Evidence - Publishing and Last Features
- **GitHub Repository**: [(https://github.com/BusamboEnt/ChristoffelApp)]
- **Video Demonstration**: [https://youtube.com/shorts/own2r3nufy0]
- **Submission**: Part 3 - Final Submission

## Project Overview

Christoffel is a fine dining restaurant application that allows guests to browse the menu, place orders, select tables, and manage their dining preferences. The app provides a seamless and elegant user experience with a dark theme aesthetic.

## Development Timeline

Based on Git commit history:
- **Initial Development**: August 31, 2025 (1 commit)
- **Major Development Phase**: November 9, 2025 (4 commits)
- **Total Commits**: 5 commits across development lifecycle

## Table of Contents
1. [Changelog - Detailed Version History](#changelog---detailed-version-history)
2. [Features Implemented](#features-implemented)
3. [Technical Implementation](#technical-implementation)
4. [Code Quality and Organization](#code-quality-and-organization)
5. [User Interface Design](#user-interface-design)
6. [Installation and Setup](#installation-and-setup)
7. [Testing Documentation](#testing-documentation)
8. [Learning Outcomes Achieved](#learning-outcomes-achieved)
9. [Known Limitations](#known-limitations)
10. [Future Enhancements](#future-enhancements)

---

## Changelog - Detailed Version History

### Version 1.0.0 - Final Release (November 12, 2025)

#### Part 3 Implementation - Course Categories and Filtering

**Commit Date: November 9, 2025**

**Major Features Added:**

1. **Menu Course Categorization**
   - Added 'course' property to Dish interface in CartContext.tsx
   - Categorized menu items into three courses: Starters, Mains, Desserts
   - Updated all existing main course items with course property
   - Created 4 new starter dishes with complete details
   - Created 4 new dessert items with complete details
   - Total menu expanded from 4 items to 12 items

2. **Filter System Implementation**
   - Added filter state management in MenuScreen
   - Created filter button UI with four options: All, Starters, Mains, Desserts
   - Implemented dynamic filtering logic using array filter method
   - Added visual active state for selected filter
   - Integrated course badges on each menu card
   - Filter updates menu display in real-time

3. **New Menu Items Added**
   
   **Starters (4 items):**
   - Crispy Calamari with Aioli - R145.00
   - Caprese Salad - R125.00
   - Soup of the Day - R95.00
   - Prawn Cocktail - R165.00
   
   **Desserts (4 items):**
   - Chocolate Lava Cake - R145.00
   - Crème Brûlée - R125.00
   - Tiramisu - R135.00
   - Fresh Berry Sorbet - R95.00

4. **UI/UX Enhancements**
   - Redesigned filter button layout with horizontal scroll
   - Updated category badge to display course type
   - Improved spacing and visual hierarchy
   - Enhanced card layouts for better readability
   - Added active filter highlighting

**Files Modified:**
- `screens/MenuScreen.tsx` - Added filtering logic and UI
- `context/CartContext.tsx` - Updated Dish interface with course property
- Updated menu data structure across all menu items

**Code Changes:**
```typescript
// Added to Dish interface
course: 'starter' | 'main' | 'dessert';

// Filter state management
const [selectedCourse, setSelectedCourse] = useState<'all' | 'starter' | 'main' | 'dessert'>('all');

// Filtering logic
const filteredMenuItems = selectedCourse === 'all' 
  ? menuItems 
  : menuItems.filter(item => item.course === selectedCourse);
```

**Testing Completed:**
- Verified filter switches between all courses
- Confirmed UI updates immediately
- Tested with all 12 menu items
- Validated active state highlighting

---

### Version 0.9.0 - Advanced Features (November 9-12, 2025)

**Commits: 4 major commits**

**Features Implemented:**

1. **User Profile Management System**
   - Created ProfileScreen.tsx with complete user interface
   - Implemented personal information form (name, email, phone)
   - Added favorite table dropdown selection
   - Integrated dietary preferences multi-select
   - Added allergy information tracking
   - Created order statistics display
   - Implemented profile save functionality with validation
   
   **Components Created:**
   - ProfileScreen.tsx (320+ lines)
   - UserContext.tsx for state management
   - Table dropdown modal interface
   
   **Features:**
   - Personal information management
   - Favorite table dropdown with availability checking
   - Multi-select dietary preferences
   - Allergy tracking system
   - Order statistics (total orders, total spent)
   - Form validation
   - Custom alert integration

2. **Custom Alert System**
   - Developed CustomAlert.tsx reusable component
   - Created useCustomAlert.tsx custom hook
   - Implemented four alert types: Success, Error, Warning, Info
   - Added Lucide icons for visual feedback
   - Designed vertically stacked button layout
   - Integrated throughout all screens
   
   **Files Created:**
   - `components/CustomAlert.tsx`
   - `hooks/useCustomAlert.tsx`
   
   **Alert Types:**
   - Success (green, CheckCircle icon)
   - Error (red, XCircle icon)
   - Warning (orange, AlertCircle icon)
   - Info (blue, Info icon)
   
   **Features:**
   - Modal overlay with dark background
   - Icon-based alert type indication
   - Configurable buttons with styles (default, cancel, destructive)
   - Smooth fade animation
   - Fully typed with TypeScript
   - Reusable across entire application

3. **Table Selection Interface**
   - Built TableSelectionScreen.tsx with grid layout
   - Implemented table availability system
   - Created visual table cards with capacity info
   - Added disabled state for occupied tables
   - Integrated with order placement flow
   - Added favorite table preference integration
   
   **Features:**
   - 10 tables with availability status
   - Table capacity display (2-8 seats)
   - Location information (Window Side, Center, Garden View, Private Room, etc.)
   - Visual selection with green border and checkmark
   - Occupied tables greyed out and disabled
   - Confirmation flow with order summary
   - Integration with user's favorite table

4. **Order History Tracking**
   - Developed OrderHistoryScreen.tsx
   - Implemented order status system (Pending, Preparing, Served, Completed)
   - Created order card UI with item details
   - Added timestamp formatting
   - Integrated order statistics
   - Color-coded status badges
   
   **Order Features:**
   - Complete order details with items and quantities
   - Total price calculation with VAT
   - Table number display
   - Status tracking with color indicators
   - Relative time display (just now, 5m ago, 2h ago, etc.)
   - Order ID generation
   - Item images and names
   - Expandable item lists

5. **Shopping Cart Enhancement**
   - Redesigned CartScreen.tsx interface
   - Added quantity adjustment controls
   - Implemented remove item functionality
   - Created subtotal and VAT calculation
   - Added clear cart option
   - Integrated custom alerts for confirmations
   
   **Cart Features:**
   - Item quantity increment/decrement buttons
   - Individual item removal with confirmation alert
   - Real-time price updates
   - VAT calculation (15% South African standard)
   - Empty cart state with helpful messaging
   - Navigation to table selection
   - Cart summary with itemized pricing

6. **Dish Details Enhancement**
   - Redesigned DishesScreen.tsx with hero image
   - Implemented full-screen image layout
   - Added quantity selector
   - Created dietary information display
   - Added allergen warnings
   - Integrated add to cart with custom alerts
   
   **Enhancements:**
   - Hero image covering 50% of screen height
   - Rounded content card overlay effect
   - Translucent status bar
   - Visual quantity controls with +/- buttons
   - Total price calculator
   - Success confirmation alerts
   - Dietary tags with icons
   - Allergen warnings with color coding

7. **Pricing Localization**
   - Converted all pricing to South African Rands (ZAR)
   - Changed currency symbol from $ to R throughout app
   - Updated VAT from 10% to 15% (South African standard)
   - Adjusted all menu item prices for local market
   - Updated cart calculations
   - Modified order history display
   
   **Price Ranges:**
   - Starters: R95 - R165
   - Mains: R395 - R725
   - Desserts: R95 - R145

8. **Icon Library Integration**
   - Installed and configured lucide-react-native
   - Installed react-native-svg dependency
   - Replaced emoji icons with professional Lucide icons
   - Updated MenuScreen with User and Receipt icons
   - Enhanced ProfileScreen with multiple icons (User, Mail, Phone, MapPin, Leaf, AlertTriangle, Receipt, etc.)
   - Added icons to alerts (CheckCircle, XCircle, AlertCircle, Info)
   - Integrated ShoppingCart icon
   - Updated navigation with icon buttons

**Files Modified/Created:**
- `screens/ProfileScreen.tsx` (new - 400+ lines)
- `screens/TableSelectionScreen.tsx` (new - 350+ lines)
- `screens/OrderHistoryScreen.tsx` (new - 300+ lines)
- `screens/CartScreen.tsx` (major update - 350+ lines)
- `screens/DishesScreen.tsx` (major redesign - 400+ lines)
- `screens/MenuScreen.tsx` (icon updates and enhancements)
- `context/UserContext.tsx` (new - 80+ lines)
- `components/CustomAlert.tsx` (new - 200+ lines)
- `hooks/useCustomAlert.tsx` (new - 30+ lines)
- `App.tsx` (updated with UserProvider)

---

### Version 0.5.0 - Initial Implementation (August 31, 2025)

**Commit: 1 initial commit**

**Base Features Implemented:**

1. **Project Setup and Configuration**
   - Initialized React Native project with Expo
   - Configured TypeScript with strict mode
   - Set up project structure and folder organization
   - Installed core dependencies (React Native, Expo, React Navigation)
   - Configured navigation system
   - Set up development environment

2. **Navigation System**
   - Installed React Navigation packages
   - Created AppNavigator.tsx with Stack Navigator
   - Configured screen routing
   - Set up navigation types and TypeScript definitions
   - Implemented headerless navigation
   - Created navigation flow (Splash -> Welcome -> Menu -> Dishes)

3. **Core Screens Created**
   - **SplashScreen.tsx** - Initial loading screen with app branding
   - **WelcomeScreen.tsx** - Onboarding swiper with 3 slides
   - **MenuScreen.tsx** - Main menu display with dish cards
   - **DishesScreen.tsx** - Detailed dish view with descriptions

4. **State Management Setup**
   - Created CartContext.tsx for global state
   - Implemented Context API structure
   - Set up cart operations (add, remove, update)
   - Created cart state management
   - Defined TypeScript interfaces for Dish and CartItem

5. **Menu System Foundation**
   - Created initial 4 main course dishes:
     - Seared Scallops with Citrus-Shallot Salad
     - Grilled Ribeye Steak
     - Wild Mushroom Risotto
     - Pan-Seared Salmon
   - Implemented menu item display with cards
   - Added basic pricing structure (in USD initially)
   - Created dish card components with images and descriptions

6. **Welcome Flow**
   - Designed 3-slide onboarding experience
   - Implemented swiper navigation with react-native-swiper
   - Created welcome images and descriptive text
   - Added auto-navigation to menu after final slide
   - Smooth transitions between slides

**Initial Files Created:**
- `App.tsx` - Application entry point
- `navigation/AppNavigator.tsx` - Navigation configuration
- `screens/SplashScreen.tsx` - Splash screen (80 lines)
- `screens/WelcomeScreen.tsx` - Welcome slides (100 lines)
- `screens/MenuScreen.tsx` - Menu display (200 lines)
- `screens/DishesScreen.tsx` - Dish details (180 lines)
- `context/CartContext.tsx` - Cart state management (150 lines)
- `package.json` - Dependencies configuration
- `tsconfig.json` - TypeScript configuration

**Initial Dependencies Installed:**
- react-native: 0.81.1
- expo: ~54.0.0
- @react-navigation/native: ^7.1.17
- @react-navigation/stack: ^7.4.8
- react-native-swiper: ^1.6.0
- react-native-gesture-handler: ^2.28.0
- react-native-reanimated: ^4.1.0

---

## Features Implemented

### Part 2 Features (Base Implementation)

1. **Home Screen with Menu Items**
   - Displays menu items with names and prices
   - Shows dish descriptions and images
   - Prices displayed in South African Rands (ZAR)
   - Professional card layout with images
   - Dark theme aesthetic
   - Responsive grid layout

2. **Dish Details Screen**
   - Dedicated screen for viewing dish details
   - Full-screen hero image
   - Add items to cart with quantity selection
   - Shows dietary information and allergens
   - Real-time price calculation
   - Category badges
   - Smooth back navigation

3. **Cart Management**
   - Items stored in array using Context API
   - Add, remove, and update quantities
   - Calculates subtotal, VAT (15%), and total
   - Clear cart functionality
   - Visual item cards with images
   - Empty cart state handling
   - Navigation to checkout

### Part 3 Features (Enhanced Implementation)

#### 1. Course Categories

**Starters (4 items):**
- **Crispy Calamari with Aioli** - R145.00
  - Tender calamari rings, lightly breaded and fried to perfection
  - Dietary: Dairy-free
  - Allergens: Shellfish, Gluten

- **Caprese Salad** - R125.00
  - Fresh mozzarella, ripe tomatoes, and basil with balsamic glaze
  - Dietary: Vegetarian, Gluten-free
  - Allergens: Dairy

- **Soup of the Day** - R95.00
  - Chef's specially prepared seasonal soup
  - Dietary: Vegetarian
  - Allergens: Dairy

- **Prawn Cocktail** - R165.00
  - Succulent prawns served with cocktail sauce and lemon
  - Dietary: Gluten-free, Dairy-free
  - Allergens: Shellfish

**Main Courses (4 items):**
- **Seared Scallops with Citrus-Shallot Salad** - R485.00
  - Fresh sea scallops with vibrant citrus and shallots
  - Dietary: Gluten-free, Dairy-free
  - Allergens: Shellfish

- **Grilled Ribeye Steak** - R725.00
  - Prime ribeye with herb butter and seasonal vegetables
  - Dietary: Gluten-free
  - Allergens: Dairy

- **Wild Mushroom Risotto** - R395.00
  - Creamy arborio rice with truffle oil and parmesan
  - Dietary: Vegetarian
  - Allergens: Dairy, Gluten

- **Pan-Seared Salmon** - R545.00
  - Atlantic salmon with lemon beurre blanc
  - Dietary: Gluten-free
  - Allergens: Fish, Dairy

**Desserts (4 items):**
- **Chocolate Lava Cake** - R145.00
  - Warm chocolate cake with molten center, served with vanilla ice cream
  - Dietary: Vegetarian
  - Allergens: Dairy, Gluten, Eggs

- **Crème Brûlée** - R125.00
  - Classic French vanilla custard with caramelized sugar topping
  - Dietary: Vegetarian, Gluten-free
  - Allergens: Dairy, Eggs

- **Tiramisu** - R135.00
  - Traditional Italian dessert with espresso-soaked ladyfingers
  - Dietary: Vegetarian
  - Allergens: Dairy, Gluten, Eggs

- **Fresh Berry Sorbet** - R95.00
  - Light and refreshing mixed berry sorbet
  - Dietary: Vegan, Gluten-free, Dairy-free
  - Allergens: None

#### 2. Filter Functionality
- **Filter Buttons**: Four filter options (All, Starters, Mains, Desserts)
- **Dynamic Filtering**: Menu updates in real-time based on selected filter
- **Visual Feedback**: Active filter highlighted with white background and black text
- **Course Badges**: Each menu item displays its course type
- **Instant Updates**: No loading states, immediate filtering
- **Persistent State**: Filter selection maintained during navigation

#### 3. Additional Features

**User Profile Management:**
- Personal information form (name, email, phone number)
- Favorite table dropdown selection with availability status
- Multi-select dietary preferences:
  - Vegetarian
  - Vegan
  - Gluten-free
  - Dairy-free
  - Halal
  - Kosher
- Multi-select allergy information:
  - Nuts
  - Shellfish
  - Dairy
  - Gluten
  - Eggs
  - Soy
  - Fish
- Order statistics dashboard:
  - Total orders placed
  - Total amount spent
  - Favorite table display
- Profile validation on save
- Quick access to order history

**Table Selection System:**
- Visual grid layout with 10 tables (2x5 grid)
- Table information displayed:
  - Table number
  - Seating capacity (2-8 seats)
  - Location (Window Side, Center, Garden View, etc.)
  - Availability status
- Available tables: Full color and interactive
- Unavailable tables: Greyed out with "Occupied" label, non-interactive
- Selected table: Green border and checkmark indicator
- Integration with user's favorite table preference
- Confirmation dialog before order placement
- Order summary display with total price

**Order History:**
- Chronological list of all past orders
- Order card display showing:
  - Order ID (last 6 digits)
  - Timestamp (relative time: "5m ago", "2h ago", etc.)
  - Table number
  - Order status with color coding:
    - Pending (Orange)
    - Preparing (Blue)
    - Served (Green)
    - Completed (Grey)
  - Item list with quantities and prices
  - Total price including VAT
- Empty state for users with no orders
- Expandable item lists (shows first 2 items, with "+X more")
- Direct navigation from profile screen

**Custom Alert System:**
- Four alert types:
  - **Success**: Green icon, positive confirmations
  - **Error**: Red icon, error messages
  - **Warning**: Orange icon, caution messages
  - **Info**: Blue icon, informational messages
- Features:
  - Icon-based visual feedback using Lucide icons
  - Customizable title and message
  - Configurable buttons (up to 3 buttons)
  - Button styles: default, cancel, destructive
  - Vertically stacked buttons for better UX
  - Dark theme modal overlay
  - Smooth fade-in/fade-out animations
  - Dismissible by button actions
- Used throughout app for:
  - Add to cart confirmations
  - Order placement success
  - Item removal confirmations
  - Profile save validation
  - Table selection confirmation
  - Cart clearing confirmation

---

## Technical Implementation

### TypeScript Features Used

#### 1. For Loops and Array Methods

Used extensively throughout the application for iterating over arrays:

**Examples:**
```typescript
// Mapping menu items to display cards
{menuItems.map((item) => (
  <MenuItem key={item.id} dish={item} />
))}

// Filtering menu by course category
const filteredMenuItems = selectedCourse === 'all' 
  ? menuItems 
  : menuItems.filter(item => item.course === selectedCourse);

// Rendering order history
{orders.map((order) => (
  <OrderCard key={order.id} order={order} />
))}

// Iterating through dietary preferences
{dietaryOptions.map((option) => (
  <PreferenceTag key={option} label={option} />
))}

// Calculating totals
const totalPrice = cart.reduce((total, item) => 
  total + (item.price * item.quantity), 0
);
```

**Use Cases:**
- Displaying menu items
- Filtering by course
- Rendering order history
- Showing table options
- Displaying dietary preferences
- Iterating through allergens
- Calculating cart totals
- Processing order items

#### 2. Functions

Multiple reusable functions for code organization:

**Cart Management Functions:**
```typescript
// Add item to cart
addToCart(dish: Dish, quantity: number): void

// Remove item from cart
removeFromCart(dishId: string): void

// Update item quantity
updateQuantity(dishId: string, quantity: number): void

// Clear entire cart
clearCart(): void

// Calculate cart total
getTotalPrice(): number

// Get total item count
getTotalItems(): number
```

**Order Management Functions:**
```typescript
// Place new order
placeOrder(tableNumber: number): void

// Format order date
formatDate(dateString: string): string

// Get status color
getStatusColor(status: string): string

// Get status text
getStatusText(status: string): string
```

**User Profile Functions:**
```typescript
// Update user profile
updateProfile(updates: Partial<UserProfile>): void

// Check profile completion
isProfileComplete(): boolean

// Toggle preference selection
toggleSelection(item: string, list: string[], setList: Function): void
```

**UI Helper Functions:**
```typescript
// Handle quantity change
handleQuantityChange(increment: boolean): void

// Handle table selection
handleTableSelect(table: Table): void

// Show custom alert
showAlert(config: AlertConfig): void

// Hide custom alert
hideAlert(): void
```

#### 3. Global Variables (Context API)

State management using React Context for global accessibility:

**CartContext:**
```typescript
interface CartContextType {
  cart: CartItem[];              // Global cart state
  orders: Order[];               // Global orders history
  addToCart: Function;           // Add to cart function
  removeFromCart: Function;      // Remove from cart function
  updateQuantity: Function;      // Update quantity function
  clearCart: Function;           // Clear cart function
  getTotalPrice: Function;       // Calculate total function
  getTotalItems: Function;       // Get item count function
  placeOrder: Function;          // Place order function
}
```

**UserContext:**
```typescript
interface UserContextType {
  user: UserProfile;             // Global user profile
  updateProfile: Function;       // Update profile function
  isProfileComplete: Function;   // Validation function
}
```

**Benefits:**
- Accessible across all components
- No prop drilling required
- Centralized state management
- Type-safe with TypeScript
- Persistent during app session

### Project Structure

```
ChristoffelApp/
├── App.tsx                          # Main application entry point (50 lines)
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── babel.config.js                  # Babel configuration
├── navigation/
│   └── AppNavigator.tsx             # Navigation configuration (50 lines)
├── screens/
│   ├── SplashScreen.tsx             # Initial loading screen (80 lines)
│   ├── WelcomeScreen.tsx            # Onboarding slides (120 lines)
│   ├── MenuScreen.tsx               # Main menu with filters (350 lines)
│   ├── DishesScreen.tsx             # Dish details and cart add (450 lines)
│   ├── CartScreen.tsx               # Shopping cart management (400 lines)
│   ├── TableSelectionScreen.tsx    # Table booking interface (350 lines)
│   ├── OrderHistoryScreen.tsx      # Past orders display (350 lines)
│   └── ProfileScreen.tsx            # User profile management (450 lines)
├── context/
│   ├── CartContext.tsx              # Cart state management (150 lines)
│   └── UserContext.tsx              # User state management (80 lines)
├── components/
│   └── CustomAlert.tsx              # Reusable alert component (200 lines)
├── hooks/
│   └── useCustomAlert.tsx           # Alert state management hook (40 lines)
└── assets/
    ├── dish1.png                    # Placeholder dish images
    ├── welcome1.png                 # Welcome screen images
    ├── welcome2.png
    └── welcome3.png
```

**Total Project Statistics:**
- **Total Files**: 15+ TypeScript/JavaScript files
- **Total Lines of Code**: 3,000+ lines
- **Components**: 8 screen components, 1 reusable component
- **Context Providers**: 2
- **Custom Hooks**: 1
- **Navigation Screens**: 8

### Technology Stack

**Core Technologies:**
- **React Native 0.81.1**: Cross-platform mobile development framework
- **TypeScript 5.8.3**: Type-safe JavaScript superset
- **Expo 54.0.0**: Development and build tooling platform
- **React 19.1.0**: UI library

**Navigation:**
- **@react-navigation/native 7.1.17**: Navigation library
- **@react-navigation/stack 7.4.8**: Stack-based navigation
- **react-native-screens 4.15.4**: Native navigation optimization
- **react-native-safe-area-context 5.6.1**: Safe area handling

**UI Components:**
- **react-native-gesture-handler 2.28.0**: Touch gesture handling
- **react-native-reanimated 4.1.0**: Smooth animations
- **react-native-swiper 1.6.0**: Swipeable views for welcome screen
- **lucide-react-native**: Modern icon library
- **react-native-svg**: SVG rendering support

**State Management:**
- **React Context API**: Global state management
- **React Hooks**: useState, useContext, useEffect

**Development Tools:**
- **Babel**: JavaScript transpiler
- **Metro**: JavaScript bundler
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Data Management

All data is stored in-memory using React Context:

**Data Structures:**

1. **Menu Items Array:**
```typescript
menuItems: MenuItem[] = [
  {
    id: string,
    label: string,
    description: string,
    price: number,
    image: ImageSource,
    category: string,
    course: 'starter' | 'main' | 'dessert',
    dietary?: string[],
    allergens?: string[]
  }
]
```

2. **Cart Items Array:**
```typescript
cart: CartItem[] = [
  {
    ...MenuItem,
    quantity: number
  }
]
```

3. **Orders Array:**
```typescript
orders: Order[] = [
  {
    id: string,
    items: CartItem[],
    tableNumber: number,
    totalPrice: number,
    date: string (ISO format),
    status: 'pending' | 'preparing' | 'served' | 'completed'
  }
]
```

4. **User Profile Object:**
```typescript
user: UserProfile = {
  name: string,
  email: string,
  phone: string,
  favoriteTable?: number,
  dietaryPreferences: string[],
  allergyInfo: string[]
}
```

**Data Flow:**
- User actions update Context state
- Context notifies all subscribed components
- Components re-render with updated data
- No external database (in-memory only)
- Data persists during app session
- Data resets on app restart

---

## Code Quality and Organization

### Multiple Files Implementation

The codebase is organized into logical modules following React best practices:

**Organization Strategy:**
1. **Separation by Feature**: Each screen is a separate file
2. **Shared Logic in Context**: Global state in dedicated Context files
3. **Reusable Components**: Common UI elements extracted to components folder
4. **Custom Hooks**: Shared stateful logic in hooks folder
5. **Type Definitions**: Interfaces defined in relevant files
6. **Navigation Separation**: Navigation logic isolated in navigation folder

**Benefits:**
- Improved code readability
- Easier maintenance and debugging
- Better collaboration in team environment
- Simpler testing of individual components
- Reduced file size for better performance
- Clear separation of concerns

### Function Organization

Functions are used throughout to:

**Encapsulate Business Logic:**
```typescript
// Cart operations
const addToCart = (dish: Dish, quantity: number) => {
  // Complex logic isolated in function
};

// Price calculations
const getTotalPrice = () => {
  return cart.reduce((total, item) => 
    total + item.price * item.quantity, 0
  );
};
```

**Reduce Code Duplication:**
```typescript
// Reusable alert display
const showAlert = (config: AlertConfig) => {
  setAlertConfig(config);
  setVisible(true);
};

// Reusable date formatting
const formatDate = (dateString: string) => {
  // Date formatting logic
};
```

**Improve Readability:**
- Small, focused functions with single responsibility
- Descriptive function names
- Clear parameter types
- Documented return values

**Enable Easier Testing:**
- Pure functions without side effects
- Predictable inputs and outputs
- Isolated logic for unit testing

**Separate Concerns:**
- UI rendering separate from business logic
- Data fetching separate from display
- State updates separate from side effects

### TypeScript Integration

**Interface Definitions:**
```typescript
interface Dish {
  id: string;
  label: string;
  description: string;
  price: number;
  image: any;
  category: string;
  course: 'starter' | 'main' | 'dessert';
  dietary?: string[];
  allergens?: string[];
}

interface CartItem extends Dish {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  tableNumber: number;
  totalPrice: number;
  date: string;
  status: 'pending' | 'preparing' | 'served' | 'completed';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  favoriteTable?: number;
  dietaryPreferences: string[];
  allergyInfo: string[];
}

interface Table {
  number: number;
  capacity: number;
  location: string;
  isAvailable: boolean;
}
```

**Type-Safe Props:**
```typescript
interface ScreenProps {
  navigation: NavigationProp;
  route: RouteProp;
}

const MyScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  // Type-safe access to props
};
```

**Enum Types:**
```typescript
type CourseType = 'starter' | 'main' | 'dessert';
type OrderStatus = 'pending' | 'preparing' | 'served' | 'completed';
type AlertType = 'success' | 'error' | 'warning' | 'info';
```

**Benefits of TypeScript:**
- Compile-time error detection
- IntelliSense and autocomplete
- Self-documenting code
- Refactoring confidence
- Reduced runtime errors
- Better IDE support

---

## User Interface Design

### Design Principles

1. **Dark Theme Aesthetic**
   - Elegant and sophisticated
   - Reduces eye strain in low-light conditions
   - Emphasizes food imagery
   - Premium feel for fine dining

2. **Consistent Visual Language**
   - Uniform color scheme throughout
   - Consistent spacing and padding
   - Standard border radius (8-12px)
   - Unified typography hierarchy

3. **Professional Typography**
   - Bold headings for emphasis
   - Readable body text (16px minimum)
   - Appropriate line heights
   - Letter spacing for elegance
   - Font weights for hierarchy

4. **Smooth Animations**
   - React Native Reanimated for performance
   - Fade transitions between screens
   - Smooth scrolling animations
   - Button press feedback
   - Modal slide-up animations

5. **Responsive Layout**
   - Adapts to different screen sizes
   - Uses Dimensions API for sizing
   - Flexible layouts with Flexbox
   - ScrollView for overflow content
   - SafeAreaView for device notches

### Color Palette

**Primary Colors:**
- Background Black: `#000000` (Pure black for OLED optimization)
- Card Background: `#111111` (Subtle elevation)
- Border Dark: `#222222` (Subtle dividers)
- Border Light: `#333333` (More visible borders)

**Text Colors:**
- Text Primary: `#FFFFFF` (High contrast)
- Text Secondary: `#AAAAAA` (Medium contrast)
- Text Tertiary: `#666666` (Low contrast)
- Placeholder: `#555555` (Form placeholders)

**Accent Colors:**
- Success Green: `#4CAF50` (Confirmations, positive actions)
- Error Red: `#FF4444` (Errors, destructive actions)
- Warning Orange: `#FFA726` (Warnings, cautions)
- Info Blue: `#42A5F5` (Informational messages)

**Dietary/Allergen Colors:**
- Dietary Green: `#1B5E20` (Dietary preference tags)
- Allergen Red: `#B71C1C` (Allergen warning tags)

**Application:**
- Backgrounds use black and dark greys
- Text uses white and light greys
- Buttons use white background with black text
- Accent colors for status and feedback
- Course badges use subtle grey backgrounds

### Accessibility Features

1. **Clear Visual Hierarchy**
   - Large headings (24-32px)
   - Medium subheadings (18-20px)
   - Standard body text (14-16px)
   - Proper heading structure

2. **High Contrast Text**
   - WCAG AA compliance for text contrast
   - White text on black background (21:1 ratio)
   - Grey text on dark background (minimum 4.5:1)
   - Readable in various lighting conditions

3. **Large Touch Targets**
   - Minimum 44x44 points (Apple guidelines)
   - Buttons with adequate padding
   - Comfortable spacing between interactive elements
   - Easy tapping on all device sizes

4. **Disabled State Indicators**
   - Reduced opacity (0.4-0.5)
   - Greyed out colors
   - Non-interactive cursors
   - Clear visual distinction

5. **Status Color Coding**
   - Green for success and positive actions
   - Red for errors and warnings
   - Orange for pending and cautions
   - Blue for information
   - Grey for disabled or inactive

6. **Icon-Based Navigation**
   - Lucide icons for clarity
   - Icons paired with text labels
   - Consistent icon sizing (24-28px)
   - Meaningful icon choices

---

## Installation and Setup

### Prerequisites

**System Requirements:**
- **Operating System**: macOS 11+ (for iOS development), Windows 10+, or Linux
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Yarn**: Optional alternative to npm
- **Expo CLI**: Installed globally or used via npx

**Mobile Development Tools:**
- **For iOS Development** (Mac only):
  - Xcode 13 or later
  - iOS Simulator
  - CocoaPods (installed via Homebrew)
- **For Android Development**:
  - Android Studio
  - Android SDK
  - Android Emulator or physical device

**Additional Tools:**
- Git for version control
- Code editor (VS Code recommended)
- Terminal/Command Prompt

### Installation Steps

**1. Clone the Repository**
```bash
git clone [your-repository-url]
cd ChristoffelApp
```

**2. Install Dependencies**
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

**3. Install iOS Dependencies (Mac only)**
```bash
cd ios
pod install
cd ..
```

**4. Start the Development Server**
```bash
npx expo start
```

**5. Run on iOS (Mac only)**
```bash
# Option 1: Using Expo CLI
npx expo run:ios

# Option 2: Press 'i' in the Expo terminal
```

**6. Run on Android**
```bash
# Option 1: Using Expo CLI
npx expo run:android

# Option 2: Press 'a' in the Expo terminal
```

### Required Packages

**Core Dependencies:**
```json
{
  "dependencies": {
    "expo": "~54.0.0",
    "react": "19.1.0",
    "react-native": "0.81.1",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/stack": "^7.4.8",
    "react-native-gesture-handler": "^2.28.0",
    "react-native-reanimated": "^4.1.0",
    "react-native-safe-area-context": "^5.6.1",
    "react-native-screens": "^4.15.4",
    "react-native-swiper": "^1.6.0",
    "react-native-worklets": "^0.6.0",
    "lucide-react-native": "latest",
    "react-native-svg": "latest"
  }
}
```

**Development Dependencies:**
```json
{
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@babel/runtime": "^7.25.0",
    "@react-native/babel-preset": "0.81.1",
    "@react-native/eslint-config": "0.81.1",
    "@react-native/metro-config": "0.81.1",
    "@react-native/typescript-config": "0.81.1",
    "@types/react": "^19.1.0",
    "babel-preset-expo": "~54.0.0",
    "typescript": "^5.8.3"
  }
}
```

### Troubleshooting

**Common Issues:**

1. **Metro bundler cache issues**
```bash
npx expo start --clear
```

2. **iOS pod installation failures**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

3. **Android build errors**
```bash
cd android
./gradlew clean
cd ..
```

4. **Node modules issues**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Testing Documentation

### Manual Testing Completed

#### Menu System Testing
- All 12 dishes display correctly with images
- Prices show in South African Rands (R)
- Dish descriptions are readable
- Images load properly without errors
- Course badges appear on each card
- Dietary tags display correctly
- Navigation to dish details works

#### Filter Functionality Testing
- "All" filter shows all 12 items
- "Starters" filter shows exactly 4 starter items
- "Mains" filter shows exactly 4 main course items
- "Desserts" filter shows exactly 4 dessert items
- Active filter highlights with white background
- Inactive filters show grey background
- Switching filters updates menu immediately
- Filter state persists during screen changes

#### Cart Operations Testing
- Add to cart creates new cart item
- Adding existing item increases quantity correctly
- Plus button increments quantity
- Minus button decrements quantity
- Minus button disabled when quantity is 1
- Remove button shows confirmation alert
- Confirming removal deletes item from cart
- Clear cart shows confirmation alert
- Confirming clear empties entire cart
- Prices calculate correctly (item price × quantity)
- Subtotal sums all items correctly
- VAT calculates as 15% of subtotal
- Total equals subtotal + VAT
- Cart badge shows correct item count
- Empty cart shows appropriate message
- "Browse Menu" button navigates to menu

#### Table Selection Testing
- All 10 tables display in grid layout
- Available tables are fully colored and interactive
- Unavailable tables are greyed out (opacity 0.5)
- Unavailable tables show "Occupied" label
- Unavailable tables cannot be tapped
- Selecting a table shows green border
- Selected table shows checkmark icon
- Table capacity displays correctly (2-8 seats)
- Table location shows correctly
- Confirmation dialog shows correct table number
- Confirmation dialog shows correct total price
- Canceling confirmation keeps selection
- Confirming places order successfully
- User's favorite table pre-selects if available

#### Order History Testing
- New orders appear at the top of list
- Order ID displays correctly (last 6 digits)
- Order date shows relative time correctly
- Table number displays correctly
- Order status shows with correct color
- First 2 items show in order card
- "+X more items" shows when more than 2 items
- Item images display correctly
- Item quantities show correctly
- Item prices calculate correctly
- Total price includes VAT (15%)
- Empty state shows when no orders
- "Browse Menu" button works in empty state

#### Profile Management Testing
- Name input accepts text
- Email input accepts email format
- Phone input accepts phone numbers
- Save button validates required fields
- Validation shows alert when fields empty
- Save success shows confirmation alert
- Table dropdown opens modal
- Modal shows all 10 tables
- "None" option clears favorite table
- Available tables can be selected
- Unavailable tables are greyed out
- Unavailable tables show "(Not Available)"
- Unavailable tables cannot be selected
- Selected table shows checkmark
- Closing modal saves selection
- Dietary preferences toggle on/off
- Multiple dietary preferences can be selected
- Allergy selections toggle on/off
- Multiple allergies can be selected
- Statistics display correctly
- "View Order History" button navigates correctly

#### Custom Alerts Testing
- Success alerts show green CheckCircle icon
- Error alerts show red XCircle icon
- Warning alerts show orange AlertCircle icon
- Info alerts show blue Info icon
- Alert title displays correctly
- Alert message displays correctly
- Buttons stack vertically
- Default buttons have white background
- Cancel buttons have grey background
- Destructive buttons have red background
- Button text colors are correct
- Tapping button executes action
- Tapping button closes alert
- Modal overlay is semi-transparent
- Alert animates in smoothly
- Alert animates out smoothly

---

## Learning Outcomes Achieved

### Programming Concepts Mastered

**1. Loops and Iteration**
- Implemented for loops using array methods (map, filter, reduce)
- Used loops for rendering lists of components
- Applied filtering logic with loops
- Practiced iteration through complex data structures
- Understood performance implications of loops in React

**2. Functions and Code Organization**
- Created reusable functions with clear purposes
- Implemented higher-order functions
- Used arrow functions for callbacks
- Organized code into modular functions
- Practiced function composition
- Understood pure vs impure functions

**3. Global State Management**
- Implemented React Context API for global state
- Created custom Context providers
- Used useContext hook for state access
- Managed complex state across components
- Understood state immutability
- Practiced state update patterns

**4. TypeScript Type System**
- Defined interfaces for data structures
- Used type annotations for variables and functions
- Implemented generic types
- Created union types for status values
- Used optional properties with ?
- Understood type inference

**5. Component Architecture**
- Built functional components with hooks
- Implemented component composition
- Created reusable components
- Practiced props passing
- Used component lifecycle methods
- Understood component re-rendering

**6. Event Handling**
- Implemented touch event handlers
- Created button press callbacks
- Handled form inputs
- Managed async events
- Used event bubbling
- Practiced event delegation

**7. Conditional Rendering**
- Implemented ternary operators for conditions
- Used && operator for conditional display
- Created loading and error states
- Built empty state components
- Practiced early returns
- Understood rendering optimization

**8. Array Manipulation**
- Used map for transformation
- Implemented filter for selection
- Applied reduce for aggregation
- Practiced find for searching
- Used slice for extraction
- Understood immutable updates

### Software Development Practices

**1. Component-Based Architecture**
- Separated concerns into components
- Created single-responsibility components
- Built reusable UI elements
- Organized components by feature
- Practiced DRY (Don't Repeat Yourself)

**2. State Management Patterns**
- Centralized state with Context
- Separated local and global state
- Implemented unidirectional data flow
- Practiced state immutability
- Used state update functions

**3. Type Safety with TypeScript**
- Prevented runtime errors with types
- Documented code with interfaces
- Enabled IDE autocomplete
- Caught errors at compile time
- Improved code maintainability

**4. Code Organization**
- Structured project by feature
- Separated concerns (UI, logic, state)
- Created logical folder structure
- Named files consistently
- Organized imports clearly

**5. Error Handling**
- Implemented try-catch blocks
- Created user-friendly error messages
- Handled edge cases
- Validated user inputs
- Provided fallback UI

**6. User Experience Design**
- Created intuitive navigation
- Provided visual feedback
- Implemented loading states
- Designed empty states
- Used consistent styling

**7. Responsive Design**
- Built flexible layouts
- Used Dimensions API
- Implemented ScrollView
- Created adaptive components
- Tested on multiple devices

**8. Version Control**
- Made regular commits
- Wrote descriptive commit messages
- Organized development timeline
- Tracked feature implementation
- Maintained code history

---

## Known Limitations

### Data Persistence
1. **In-Memory Storage Only**
   - All data (cart, orders, profile) stored in React state
   - Data lost when app closes or refreshes
   - No local database integration
   - No cloud synchronization

**Impact**: Users lose their data between sessions

**Future Solution**: Implement AsyncStorage or database

### Backend Integration
2. **No Server Connection**
   - No API endpoints for data fetching
   - No real-time updates
   - No data synchronization across devices
   - Static menu data hardcoded in app

**Impact**: Cannot update menu without app update

**Future Solution**: Integrate REST API or GraphQL backend

### Authentication
3. **No User Authentication**
   - No login/signup functionality
   - No user accounts
   - No password protection
   - Single user profile only

**Impact**: Cannot support multiple users

**Future Solution**: Implement authentication system (Firebase, Auth0)

### Payment Processing
4. **No Payment Integration**
   - No checkout process
   - No payment gateway
   - No order confirmation
   - No receipt generation

**Impact**: Cannot process real transactions

**Future Solution**: Integrate payment provider (Stripe, PayPal, Yoco)

### Media Assets
5. **Placeholder Images**
   - Same image used for all dishes
   - No real food photography
   - Limited visual differentiation

**Impact**: Less appealing visual presentation

**Future Solution**: Add professional food photography

### Table Management
6. **Static Table Availability**
   - Table status hardcoded
   - No real-time availability updates
   - No reservation system
   - Manual availability management

**Impact**: Cannot reflect actual table status

**Future Solution**: Implement real-time table management system

### Offline Functionality
7. **No Offline Support**
   - Requires active app session
   - No offline mode
   - No data caching
   - No queue for pending actions

**Impact**: Cannot use without active session

**Future Solution**: Implement offline-first architecture

### Scalability
8. **Limited Menu Size**
   - Hardcoded menu items
   - No pagination
   - Performance may degrade with large menus
   - No search functionality

**Impact**: Difficult to scale to larger menus

**Future Solution**: Implement dynamic menu loading and search

---

## Future Enhancements

### Phase 1: Backend Integration (Priority: High)

**1. API Development**
- RESTful API for menu management
- Order processing endpoints
- User profile synchronization
- Real-time table status updates
- Admin dashboard for management

**2. Database Implementation**
- PostgreSQL or MongoDB for data storage
- Menu items database
- User accounts and profiles
- Order history persistence
- Table management system

**3. Data Persistence**
- AsyncStorage for local caching
- Offline data synchronization
- State persistence between sessions
- Background data sync

### Phase 2: User Features (Priority: High)

**4. Authentication System**
- User registration and login
- Email verification
- Password reset functionality
- Social media login (Google, Facebook)
- Secure token-based authentication

**5. User Accounts**
- Personal profile with avatar
- Order history per user
- Saved payment methods
- Favorite dishes list
- Custom dietary preferences per user

**6. Enhanced Profile**
- Profile photo upload
- Address management
- Multiple delivery addresses
- Birthday and special dates
- Loyalty points tracking

### Phase 3: Payment Integration (Priority: High)

**7. Payment Gateway**
- Integration with Yoco (South African provider)
- Credit/debit card processing
- EFT payments
- SnapScan integration
- Payment history and receipts

**8. Order Management**
- Real-time order tracking
- Kitchen notification system
- Estimated preparation time
- Order modification requests
- Split bill functionality

### Phase 4: Enhanced Functionality (Priority: Medium)

**9. Push Notifications**
- Order status updates
- Table ready notifications
- Special offers and promotions
- Birthday rewards
- Order delay alerts

**10. Reservation System**
- Table booking in advance
- Time slot selection
- Party size management
- Special occasion notes
- Cancellation and modification

**11. Reviews and Ratings**
- Dish reviews and ratings
- Photo uploads with reviews
- Chef responses to reviews
- Verified order reviews only
- Review moderation system

**12. Chef's Recommendations**
- Daily specials
- Seasonal menu items
- Pairing suggestions
- Chef's tasting menu
- Wine pairing recommendations

### Phase 5: Advanced Features (Priority: Medium)

**13. Loyalty Program**
- Points system for orders
- Reward tiers (Bronze, Silver, Gold)
- Exclusive member offers
- Birthday bonuses
- Referral rewards

**14. Social Features**
- Share dishes on social media
- Tag dining companions
- Restaurant check-ins
- Food photography gallery
- Community reviews

**15. Search and Discovery**
- Search menu by name
- Filter by dietary requirements
- Filter by price range
- Sort by popularity
- Filter by allergens

**16. Customization Options**
- Custom dish modifications
- Special preparation requests
- Spice level selection
- Portion size options
- Add extra toppings

### Phase 6: Multi-Platform (Priority: Low)

**17. Multi-Language Support**
- English
- Afrikaans
- Zulu
- Xhosa
- Language selection in settings

**18. Accessibility**
- Screen reader support
- Voice commands
- High contrast mode
- Font size adjustment
- Color blind mode

**19. Platform Expansion**
- Web application
- Tablet optimization
- Desktop version
- Progressive Web App (PWA)
- Smart watch companion app

### Phase 7: Analytics and Insights (Priority: Low)

**20. User Analytics**
- Order patterns
- Favorite dishes
- Spending insights
- Visit frequency
- Personalized recommendations

**21. Restaurant Analytics**
- Popular dishes tracking
- Peak hours analysis
- Revenue reports
- Customer demographics
- Menu performance metrics

### Phase 8: Integration (Priority: Low)

**22. Third-Party Integrations**
- Google Maps for directions
- Uber/Bolt for transportation
- Calendar integration for reservations
- Email marketing integration
- SMS notifications

**23. Advanced Ordering**
- Group ordering
- Pre-ordering for events
- Catering services
- Take-away orders
- Delivery integration

---

## Conclusion

This application demonstrates a comprehensive understanding of React Native development, TypeScript programming, state management, and mobile UI/UX design. All required features from Parts 2 and 3 have been successfully implemented with additional enhancements for a complete dining experience application.

### Key Achievements

**Technical Excellence:**
- Well-organized codebase with 3,000+ lines of TypeScript
- Type-safe implementation with comprehensive interfaces
- Efficient state management using React Context
- Reusable components and custom hooks
- Professional code structure and organization

**Feature Completeness:**
- 12 menu items across 3 courses (Starters, Mains, Desserts)
- Dynamic filtering system with 4 filter options
- Complete ordering workflow from browse to checkout
- User profile management with preferences
- Order history with status tracking
- Table selection with availability management
- Custom alert system with 4 alert types

**User Experience:**
- Elegant dark theme for fine dining aesthetic
- Smooth animations and transitions
- Intuitive navigation flow
- Professional typography and spacing
- High contrast for readability
- Responsive layouts for all screen sizes

**Best Practices:**
- Component-based architecture
- Separation of concerns
- Type safety with TypeScript
- Reusable code patterns
- Clear naming conventions
- Comprehensive documentation

### Project Impact

This project successfully demonstrates the ability to:
1. Build a complete mobile application from scratch
2. Implement complex state management
3. Create professional user interfaces
4. Follow software development best practices
5. Organize code for maintainability
6. Document work comprehensively

The application provides a solid foundation for a real-world restaurant ordering system and showcases skills in mobile development, TypeScript programming, and user experience design.

The development process followed industry best practices with regular commits, incremental feature development, and thorough testing at each stage. The final product is a polished, professional application suitable for a fine dining establishment.

---

## Repository Information

- **GitHub Repository**: [(https://github.com/BusamboEnt/ChristoffelApp)]
- **Video Demonstration**: [https://youtube.com/shorts/own2r3nufy0]
- **Submission Date**: November 12, 2025

## Declaration

I confirm that this is my original work and that I have properly referenced all sources used in this project. All code has been written by me, and any external libraries or resources used have been properly documented in this README.

**Signature**: _A B Tshibanda___________

**Date**: November 12, 2025

---

**Project Version**: 1.0.0  
**Last Updated**: November 12, 2025  
**Total Development Time**: August 31 - November 12, 2025  
**Total Commits**: 5  
**Total Lines of Code**: 3,000+  
**Technologies Used**: React Native, TypeScript, Expo, React Navigation