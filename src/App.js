import React from "react";
import List from "./List";
import STORE from "./store";
import "./App.css";

class App extends React.Component {
  state = {
    store: STORE
  };

  omit = (obj, keyToOmit) => {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }


  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }


  handleAddCard = (listId) => {
    console.log(listId)
    const card = this.newRandomCard()
    const newCards = {...this.state.store.allCards, [card.id]: card }
    console.log(newCards)
    const newList = this.state.store.lists.map(list => {
      if (list.id === listId){
        return {...list,
           cardIds: [...list.cardIds, card.id]}
      } return list;
    })
    console.log(newList)
    this.setState({
      store: {lists: newList, allCards: newCards}
    })
  }

  handleDeleteCard = id => {
    const newCards = this.omit(this.state.store.allCards, id) 
    const newList = this.state.store.lists.map(list => ({...list, cardIds: list.cardIds.filter(cardId => cardId !== id)}))
    this.setState({
        store: {lists: newList, allCards: newCards}  
    });
  };
 


  render() {
    const { store } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDeleteCard= {this.handleDeleteCard}
              handleAddCard= {this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
