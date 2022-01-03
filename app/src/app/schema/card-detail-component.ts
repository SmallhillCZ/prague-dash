import { Observable } from "rxjs";
import { Card } from "./card";

export interface CardDetailComponent {
  card: Card;

  title?: Observable<string>;
}