import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfesorService } from '../services/profesor.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardProfesorGuard implements CanActivate, CanLoad {

  constructor(
    private profesorService: ProfesorService,
    private router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.profesorService.validateToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.profesorService.validateToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
