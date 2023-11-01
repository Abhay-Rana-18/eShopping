const reducer = (admin = false, action) => {
    if (action === true) {
      return $("#add").show(); 
    } else {
        return $("#add").hide();
    }
  };
  
  export default reducer;
  