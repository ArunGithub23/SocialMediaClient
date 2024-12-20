
    const authReducer=(state={authData:null,selecteduser:'test',loading:false,error:false},action)=>{

        
        switch (action.type) {  
            case 'AUTH_START':
                return {...state,loading:true,error:false}
                
                break;

                case 'AUTH_SUCCESSFUL':
                    localStorage.setItem("profile",JSON.stringify(action.data))
                return {...state,authData:action.data,loading:false,error:false}
                
                break;

                case 'AUTH_FAIL':
                return {...state,loading:false,error:true}
                
                break;

                case 'SELECT_USER':
                    console.log('selecteduser reducer',action.payload,state.selecteduser);
                    
                return  { ...state, selecteduser: action.payload };
                
                break;

                case 'AUTH_LOGOUT':
                    return {}
                    
                    break;
            
            default:
                return state
                break;
        }


    }


    export default authReducer;