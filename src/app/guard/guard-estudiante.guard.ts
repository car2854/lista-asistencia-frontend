import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EstudianteService } from '../services/estudiante.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardEstudianteGuard implements CanActivate, CanLoad {

  constructor(
    private estudianteService: EstudianteService,
    private router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.estudianteService.validateToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigateByUrl('/auth/login-estudiante');
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.estudianteService.validateToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigateByUrl('/auth/login-estudiante');
          }
        })
      );
  }
}
