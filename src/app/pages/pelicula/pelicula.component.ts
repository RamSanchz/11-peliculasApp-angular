import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public movie: MovieResponse;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    /* combineLatest permite hacer n peticiones http y suscribirse cuando almenos ya se devolvio 
    un resultado de cada una */
    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id),
    ]).subscribe(([pelicula, cast]) => {
      //validacion pelicula
      if (!pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = pelicula;

      //validacion cast
      this.cast = cast.filter((actor) => actor.profile_path != null);
    });

    /* esto de aca abajo es lo miso que se obtiene con el combineLastest */
    // this.peliculasService.getPeliculaDetalle(id).subscribe((movie) => {
    //   if (!movie) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.movie = movie;
    // });

    // this.peliculasService.getCast(id).subscribe((cast) => {
    //   this.cast = cast.filter((actor) => actor.profile_path != null);
    // });
  }

  onRegresar() {
    /* locaton nos da la informacion de la posicion en pantalla del usuario */
    this.location.back();
  }
}
