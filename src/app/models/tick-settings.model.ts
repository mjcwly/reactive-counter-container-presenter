import { TickDirection } from "./tick-direction.enum";
import { TickSpeed } from "./tick-speed.enum";

export interface ITickSettings {
  isTicking: boolean;
  tickSpeed: TickSpeed;
  tickDirection: TickDirection
}
