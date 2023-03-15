(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["child-routes-module"],{

/***/ "E5tf":
/*!**********************************************!*\
  !*** ./src/app/pages/child-routes.module.ts ***!
  \**********************************************/
/*! exports provided: ChildRoutesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildRoutesModule", function() { return ChildRoutesModule; });
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../guards/admin.guard */ "Tk1w");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "U5Cf");
/* harmony import */ var _progress_progress_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress/progress.component */ "EsRH");
/* harmony import */ var _grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grafica1/grafica1.component */ "XHMk");
/* harmony import */ var _account_setting_account_setting_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./account-setting/account-setting.component */ "NRMY");
/* harmony import */ var _rxjs_rxjs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rxjs/rxjs.component */ "IHpz");
/* harmony import */ var _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./perfil/perfil.component */ "RG4u");
/* harmony import */ var _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mantenimientos/usuarios/usuarios.component */ "U8Pk");
/* harmony import */ var _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mantenimientos/hospitales/hospitales.component */ "+a8t");
/* harmony import */ var _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mantenimientos/medicos/medicos.component */ "m3Lg");
/* harmony import */ var _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mantenimientos/medicos/medico.component */ "YSFb");
/* harmony import */ var _busquedas_busquedas_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./busquedas/busquedas.component */ "gMWV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");

//componentes




//import { PromesasComponent } from './promesas/promesas.component';










const childRoutes = [
    //data: { titulo: 'Dashboard'} : especificamos parametros de ruta
    //estas rutas comparten el mismo template
    { path: 'account-settings', component: _account_setting_account_setting_component__WEBPACK_IMPORTED_MODULE_4__["AccountSettingComponent"], data: { titulo: 'Account-settings' } },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"], data: { titulo: 'Dashboard' } },
    { path: 'buscar/:termino', component: _busquedas_busquedas_component__WEBPACK_IMPORTED_MODULE_11__["BusquedasComponent"], data: { titulo: 'Busquedas' } },
    { path: 'progress', component: _progress_progress_component__WEBPACK_IMPORTED_MODULE_2__["ProgressComponent"], data: { titulo: 'ProgressBar' } },
    { path: 'grafica1', component: _grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_3__["Grafica1Component"], data: { titulo: 'Grafica1' } },
    //{ path: 'promesas',component: PromesasComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs', component: _rxjs_rxjs_component__WEBPACK_IMPORTED_MODULE_5__["RxjsComponent"], data: { titulo: 'Rxjs' } },
    { path: 'perfil', component: _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_6__["PerfilComponent"], data: { titulo: 'Perfil de usuario' } },
    //Mantenimientos
    { path: 'hospitales', component: _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_8__["HospitalesComponent"], data: { titulo: ' Mantenimiento Hopitales' } },
    { path: 'medicos', component: _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_9__["MedicosComponent"], data: { titulo: 'Mantenimiento de Medicos ' } },
    { path: 'medico/:id', component: _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_10__["MedicoComponent"], data: { titulo: 'Mantenimiento de Medicos ' } },
    //Rutas de admin protegida en AdminGuard  para que el usuario que no sea administrador no acceda a traves de la url directamente al usuarioComponent
    { path: 'usuarios', canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_0__["AdminGuard"]], component: _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_7__["UsuariosComponent"], data: { titulo: 'Mantenimiento de Usuarios ' } },
];
class ChildRoutesModule {
}
ChildRoutesModule.ɵfac = function ChildRoutesModule_Factory(t) { return new (t || ChildRoutesModule)(); };
ChildRoutesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: ChildRoutesModule });
ChildRoutesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"].forChild(childRoutes)], _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](ChildRoutesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"]] }); })();


/***/ }),

/***/ "Tk1w":
/*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
/*! exports provided: AdminGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuard", function() { return AdminGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/usuario.service */ "on2l");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AdminGuard {
    constructor(usuarioService, router) {
        this.usuarioService = usuarioService;
        this.router = router;
    }
    canActivate(route, state) {
        //NOTA: esta restriccion en la ruta se establece en pages.routing aplicandose a UsuariosComponent
        //si el role del usuario es ADMIN_ROLE  dejalo acceder a todas la rutas
        if (this.usuarioService.role === 'ADMIN_ROLE') {
            return true;
        }
        else {
            //si no es ADMIN_ROLE mandalo al dashboard
            this.router.navigateByUrl('/dashboard');
            return false;
        }
    }
}
AdminGuard.ɵfac = function AdminGuard_Factory(t) { return new (t || AdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_usuario_service__WEBPACK_IMPORTED_MODULE_1__["UsuarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AdminGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=child-routes-module.js.map