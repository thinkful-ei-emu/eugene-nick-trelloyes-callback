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

  handleDeleteCard = id => {
      console.log(id)
    const newCards = this.omit(this.state.store.allCards, id) 
      console.log(newCards)
    const newList = this.state.store.lists.map(list => ({...list, cardIds: list.cardIds.filter(cardId => cardId !== id)}))

    console.log(newList)

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
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDeleteCard= {this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
