exports = function addIdsToNestedObjects(obj) {
  const addIDsToObjectsInArrays = (item) => {
    if (Array.isArray(item)) {
      item.forEach(subItem => {
        if (typeof subItem === 'object' && subItem !== null && !subItem._id) {
          subItem._id = new BSON.ObjectId(); // Use ObjectId directly
        }
        addIDsToObjectsInArrays(subItem); // Recursive call for nested arrays/objects
      });
    } else if (typeof item === 'object' && item !== null) {
      Object.values(item).forEach(addIDsToObjectsInArrays); // Recursive call for nested objects
    }
  };

  addIDsToObjectsInArrays(obj);
};
