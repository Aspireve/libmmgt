import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Tab = {
    id:string;
    title:string;
    route:string;
};

interface TabState {
    tabs:Tab[];
    activeTab:string;
};

const initialState :TabState={
    tabs:[],
    activeTab:"",
};

const tabSlice = createSlice({
    name: "tabs",
    initialState,
    reducers:{
        addTab:(state,action: PayloadAction<{title:string;route:string}>)=>{
            const {title, route} = action.payload;
            const existingTab = state.tabs.find((tab)=>tab.id === route);

            if(!existingTab){
                state.tabs.push({id:route,title,route});
            }
            state.activeTab = route;
        },
        closeTab:(state, action: PayloadAction<string>)=>{
            const id = action.payload;
            state.tabs = state.tabs.filter((tab)=> tab.id !== id);
            if (state.activeTab === id && state.tabs.length > 0) {
            state.activeTab = state.tabs[state.tabs.length - 1].id;
            }else if(state.tabs.length === 0){
                state.activeTab = "";
            }
        },
        setActiveTab: (state, action: PayloadAction<string>)=>{
            state.activeTab = action.payload;
        }
    }
})


export const { addTab, closeTab, setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;