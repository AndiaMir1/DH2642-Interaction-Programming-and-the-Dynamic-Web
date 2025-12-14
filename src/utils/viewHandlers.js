export function onEnterKey(action){
    return function(event){
        if(event.key ==="Enter"){
            event.preventDefault();
            action()
        }
    };
}
/*
export function onTextChange(action){
    return function(event){
        event.preventDefault();
            action()
    }
}*/