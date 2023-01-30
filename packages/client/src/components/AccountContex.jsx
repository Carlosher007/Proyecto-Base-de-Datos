// /** @format */

// import { useNavigate } from 'react-router';

// const { createContext, useState, useEffect } = require('react');

// export const AccountContext = createContext();
// const UserContext = ({ children }) => {
//   const [user, setUser] = useState({ loggedIn: null });

//   const navigate = useNavigate();
//   const updateUserType = (newType) => {
//     setUser((prevState) => {
//       return { ...prevState, userType: newType };
//     });
//   };

//   const updateLoggedIn = (newValue) => {
//     setUser((prev) => ({ ...prev, loggedIn: newValue }));
//   };

//   useEffect(() => {
//     let apiUrl = 'http://localhost:8000/auth/loginT';
//     if (user.tipo === 'cliente') {
//       apiUrl = 'http://localhost:8000/auth/loginC';
//     }

//     fetch(apiUrl, {
//       credentials: 'include',
//     })
//       .catch((err) => {
//         setUser({ loggedIn: false });
//         return;
//       })
//       .then((r) => {
//         if (!r || !r.ok || r.status >= 400) {
//           setUser({ loggedIn: false });
//           return;
//         }
//         return r.json();
//       })
//       .then((data) => {
//         if (!data || data['loggedIn'] === false) {
//           setUser({ loggedIn: false });
//           return;
//         }
//         console.log(data);
//         setUser({ ...data });
//         navigate('/dashboardT');
//       });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <AccountContext.Provider
//       value={{ user, setUser, updateUserType, updateLoggedIn }}
//     >
//       {children}
//     </AccountContext.Provider>
//   );
// };

// export default UserContext;

import { useNavigate } from 'react-router';

const { createContext, useState, useEffect } = require('react');

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8000/auth/loginT', {
      credentials: 'include',
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((r) => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        // navigate('/dashboardT');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;