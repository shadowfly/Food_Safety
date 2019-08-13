function formData2JSON (formData) {
    var formJSON = {}
        for(var pair of formData.entries()) {
          formJSON[pair[0]] = pair[1];
        } 
        return JSON.stringify(formJSON);
}

export default formData2JSON;