/** @format */

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

// import { useNavigate } from 'react-router';

// const { createContext, useState, useEffect } = require('react');

// export const AccountContext = createContext();

// const UserContext = ({ children }) => {

//   const [user, setUser] = useState({ loggedIn: null });
//   console.log(user)
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!) {
// console.log('1');
//       if (
//         (location.pathname === '/loginT' ||
//           location.pathname === '/registroT') &&
//         !user.loggedIn
//       ) {
// console.log('2');
//         fetch('http://localhost:8000/auth/loginT', {
//           credentials: 'include',
//         })
//           .catch((err) => {
// console.log('3');

//             setUser({ loggedIn: false });
//             return;
//           })
//           .then((r) => {
//             if (!r || !r.ok || r.status >= 400) {
// console.log('4');
//               setUser({ loggedIn: false });
//               return;
//             }
// console.log('5');
//             return r.json();
//           })
//           .then((data) => {
//             if (!data) {
// console.log('6');
//               setUser({ loggedIn: false });
//               return;
//             }
// console.log('7');
//             setUser({ ...data });
//             // navigate('/dashboardT');
//           });
//       } else if (
//         (location.pathname === '/loginC' ||
//           location.pathname === '/registroC') &&
//         !user.loggedIn
//       ) {
// console.log('8');
//         fetch('http://localhost:8000/auth/loginC', {
//           credentials: 'include',
//         })
//           .catch((err) => {
//             setUser({ loggedIn: false });
//             return;
//           })
//           .then((r) => {
//             if (!r || !r.ok || r.status >= 400) {
//               setUser({ loggedIn: false });
//               return;
//             }
//             return r.json();
//           })
//           .then((data) => {
//             if (!data) {
//               setUser({ loggedIn: false });
//               return;
//             }
//             setUser({ ...data });
//             // navigate('/dashboardC');
//           });
//       }
//     } else {
// console.log('9');
//       if (!user.loggedIn) {
// console.log('10');
//         console.log('en path');
//         setUser({ loggedIn: false });
//         return;
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <AccountContext.Provider value={{ user, setUser }}>
//       {children}
//     </AccountContext.Provider>
//   );
// };

// export default UserContext;

import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const { createContext, useState, useEffect } = require('react');

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  console.log(user);
  console.log(user.tipo);
  console.log(user.tipo === 'trabajador');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      user.tipo === 'trabajador' ||
      location.pathname === '/loginT' ||
      location.pathname === '/registroT' ||
      location.pathname === '/dashboardT' ||
      location.pathname === '/historialPagosT' ||
      location.pathname === '/elegirLaborT' ||
      location.pathname === '/notificacionT'
    ) {
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
    } else if (
      user.tipo === 'trabajador' ||
      location.pathname === '/loginC' ||
      location.pathname === '/registroC' ||
      location.pathname === '/dashboardC' ||
      location.pathname === '/notificacionC' ||
      location.pathname === '/historialPagosC' ||
      location.pathname === '/buscarServicioC'
    ) {
      fetch('http://localhost:8000/auth/loginC', {
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
    } else if (location.pathname === '/' && !user.loggedIn) {
      setUser({ loggedIn: false });
    } else {
      setUser({ loggedIn: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
