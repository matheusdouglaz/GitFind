import { useState } from "react";
import { Header } from "../../components/Header";
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login }); // Adicione 'login' aqui

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`,
      );
      const newRepos = await reposData.json(); // Corrija para 'reposData' aqui

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleGetData();
    }
  }


  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input name="usuario"
              value={user}
              onChange={event => setUser(event.target.value)}
              placeholder="@username"
              onKeyDown={handleKeyDown} />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser && (
            <div className="perfil">
              <img src={currentUser.avatar_url} alt="imagem perfil" className="profile" />
              <div>
                <h3>{currentUser.name}</h3>
                <span>{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          )}
          {repos && (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo, index) => (
                <ItemList key={index} title={repo.name} description={repo.description} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;