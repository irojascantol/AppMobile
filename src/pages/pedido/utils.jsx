

export function mergeComments(str1, str2){
    if(!!str1 && !!str2){
        return  str1 + " | " + str2;
    }else if(!!str1 && !str2){
        return  str1;
    }else if(!str1 && !!str2){
        return  str2;
    }else{
        return '';
    }
}