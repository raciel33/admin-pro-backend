 const getMenuFrontEnd = (role = 'USER_ROLE') => {

     const menu = [{
             titulo: 'Dashboard',
             icono: 'mdi mdi-gauge',
             submenu: [
                 { titulo: 'Main', url: '/' },
                 { titulo: 'ProgressBar', url: 'progress' },
                 { titulo: 'Graficas', url: 'grafica1' },
                 { titulo: 'Promesas', url: 'promesas' },
                 { titulo: 'Rxjs', url: 'rxjs' },


             ]

         },
         {
             titulo: 'Mantenimientos',
             icono: 'mdi mdi-folder-lock-open',
             submenu: [
                 // { titulo: 'Usuarios', url: 'usuarios'},---SI NO ES ADMIN_ROLE NO SE VA MOSTRAR
                 { titulo: 'Hospitales', url: 'hospitales' },
                 { titulo: 'Medicos', url: 'medicos' }


             ]

         }
     ];

     //si es ADMIN_ROLE vamos a añadir al arreglo del menú el mantenimiento de usuarios
     if (role === 'ADMIN_ROLE') {
         menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
     }

     return menu;
 }

 module.exports = {
     getMenuFrontEnd
 }