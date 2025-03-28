
    const authReducer=(state={authData:null,  chatuser:{id:null,name:"",state:false},followclicked:false,selecteduser:'test',showlistof:'followers',loading:false,error:false},action)=>{

        
        switch (action.type) {  
            case 'AUTH_START':
                return {...state,loading:true,error:false}
                
                break;

                case 'AUTH_SUCCESSFUL':
                    localStorage.setItem("profile",JSON.stringify(action.data))
                return {...state,authData:action.data,loading:false,error:false}
                
                break;

                case 'LATESTUSER_AUTH_SUCCESSFUL':
                    // console.log('latestuser_auth_successful',action.data);
                    
                return {...state,authData:action.data,loading:false,error:false}
                
                break;

                case 'AUTH_FAIL':
                return {...state,loading:false,error:true}
                
                break;

                case 'SELECT_USER':
                    // console.log('selecteduser reducer',action.payload,state.selecteduser);
                    
                return  { ...state, selecteduser: action.payload };
                
                break;

                case 'SHOW_LIST':
                    // console.log('Showlist reducer',state.showlistof);
                    
                return  { ...state, showlistof: action.payload };
                
                break;

                case 'CHAT_USER_CLICKED':
                    // console.log('Chat_user reducer',state.chatuser);
                    
                return  { ...state, chatuser: action.payload };

                case 'FOLLOW_BUTTON_CLICKED':
                    // console.log('followclicked reducer',state.followclicked);
                    
                return  { ...state, followclicked: action.payload };
                
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