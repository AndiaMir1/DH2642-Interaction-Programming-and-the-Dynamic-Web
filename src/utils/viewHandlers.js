export function onEnterKey(action){
    return function(event){
        if(event.key ==="Enter"){
            event.preventDefault();
            action()
        }
    };
}
