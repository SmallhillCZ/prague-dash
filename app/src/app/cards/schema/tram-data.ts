export interface TramData {

  /**
   * Tram line identification
   */
  number: string;

  /**
   * Tram stop
   */
  stop: string;

  /**
   * Minutes till next tram
   */
  minutes: number;
}