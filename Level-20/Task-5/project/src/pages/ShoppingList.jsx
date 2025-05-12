import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMealPlan } from '../contexts/MealPlanContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ShoppingList = () => {
  const navigate = useNavigate();
  const { shoppingList, loading, generateShoppingList, printShoppingList } = useMealPlan();
  const [localShoppingList, setLocalShoppingList] = useState([]);
  const [groupedByCategory, setGroupedByCategory] = useState({});
  
  useEffect(() => {
    const loadShoppingList = async () => {
      if (shoppingList.length === 0) {
        // No shopping list in state, try to generate one
        const list = await generateShoppingList();
        
        if (list.length === 0) {
          // If still empty, redirect to meal planner
          navigate('/meal-planner');
        }
      } else {
        setLocalShoppingList(shoppingList);
        
        // Group items by category
        const grouped = groupItemsByCategory(shoppingList);
        setGroupedByCategory(grouped);
      }
    };
    
    loadShoppingList();
  }, [shoppingList, generateShoppingList, navigate]);
  
  // Group shopping list items by food category
  const groupItemsByCategory = (items) => {
    // Define some common categories
    const categories = {
      produce: ['fruit', 'vegetable', 'tomato', 'onion', 'potato', 'carrot', 'lettuce', 'apple', 'banana', 'garlic', 'herb'],
      dairy: ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'egg'],
      meat: ['beef', 'chicken', 'pork', 'fish', 'salmon', 'tuna', 'shrimp', 'lamb', 'turkey', 'meat'],
      bakery: ['bread', 'bun', 'pastry', 'cake', 'cookie', 'flour', 'dough'],
      pantry: ['rice', 'pasta', 'bean', 'lentil', 'canned', 'oil', 'vinegar', 'sauce', 'spice'],
      frozen: ['frozen', 'ice cream'],
      beverages: ['water', 'juice', 'soda', 'coffee', 'tea', 'wine', 'beer']
    };
    
    // Initialize grouped object with categories
    const grouped = {
      produce: [],
      dairy: [],
      meat: [],
      bakery: [],
      pantry: [],
      frozen: [],
      beverages: [],
      other: []
    };
    
    // Assign each item to a category
    items.forEach(item => {
      const itemName = item.name.toLowerCase();
      let assigned = false;
      
      // Check each category for matching keywords
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => itemName.includes(keyword))) {
          grouped[category].push(item);
          assigned = true;
          break;
        }
      }
      
      // If no category matched, put in "other"
      if (!assigned) {
        grouped.other.push(item);
      }
    });
    
    return grouped;
  };
  
  const handlePrint = () => {
    printShoppingList();
  };
  
  // Toggle item as completed
  const toggleItemCompleted = (categoryName, index) => {
    // Update the grouped list
    const updatedGrouped = { ...groupedByCategory };
    updatedGrouped[categoryName][index].completed = !updatedGrouped[categoryName][index].completed;
    setGroupedByCategory(updatedGrouped);
    
    // Update the flat list to keep them in sync
    const flatIndex = localShoppingList.findIndex(
      item => item.name === updatedGrouped[categoryName][index].name && 
              item.quantity === updatedGrouped[categoryName][index].quantity
    );
    
    if (flatIndex !== -1) {
      const updatedList = [...localShoppingList];
      updatedList[flatIndex].completed = updatedGrouped[categoryName][index].completed;
      setLocalShoppingList(updatedList);
    }
  };
  
  // Add a new item to the shopping list
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '' });
  
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };
  
  const addNewItem = (e) => {
    e.preventDefault();
    
    if (!newItem.name.trim()) {
      return;
    }
    
    const itemToAdd = {
      ...newItem,
      completed: false,
      recipeIds: []  // No associated recipes
    };
    
    // Update flat list
    setLocalShoppingList(prev => [...prev, itemToAdd]);
    
    // Update grouped list
    const updatedGrouped = groupItemsByCategory([...localShoppingList, itemToAdd]);
    setGroupedByCategory(updatedGrouped);
    
    // Reset form
    setNewItem({ name: '', quantity: '', unit: '' });
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="shopping-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping List</h1>
          <button className="button button-primary" onClick={handlePrint}>
            Print Shopping List
          </button>
        </div>
        
        <div className="shopping-list-content">
          <div className="add-item-form no-print">
            <h3>Add Item</h3>
            <form onSubmit={addNewItem} className="add-item-form-container">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleNewItemChange}
                  placeholder="Item name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleNewItemChange}
                  placeholder="Quantity"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="unit"
                  value={newItem.unit}
                  onChange={handleNewItemChange}
                  placeholder="Unit"
                />
              </div>
              <button type="submit" className="button button-primary">
                Add Item
              </button>
            </form>
          </div>
          
          <div className="shopping-list-categories">
            {Object.entries(groupedByCategory).map(([category, items]) => {
              // Skip empty categories
              if (items.length === 0) return null;
              
              return (
                <div key={category} className="shopping-list-category">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <ul className="shopping-list-items">
                    {items.map((item, index) => (
                      <li 
                        key={index} 
                        className={`shopping-list-item ${item.completed ? 'completed' : ''}`}
                      >
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={item.completed || false}
                            onChange={() => toggleItemCompleted(category, index)}
                            className="item-checkbox no-print"
                          />
                          <span className="item-text">
                            <span className="item-quantity">{item.quantity}</span>
                            <span className="item-unit">{item.unit}</span>
                            <span className="item-name">{item.name}</span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="shopping-list-footer no-print">
          <p>
            <strong>Pro Tip:</strong> Check off items as you shop, and click 'Print' to get a paper copy of your list!
          </p>
          <button 
            className="button button-outline"
            onClick={() => navigate('/meal-planner')}
          >
            Back to Meal Planner
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;