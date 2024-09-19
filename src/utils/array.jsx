
export const upSelectedOption = (org_data, value) => {
    let data = [...org_data]
    data.forEach(function(item,i){
        if(item === value){
            data.splice(i, 1);
            data.unshift(item);
        }
      })
    return data;        
}