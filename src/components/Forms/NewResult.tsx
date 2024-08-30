import { FormEvent, useState, FC } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Switch,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import {
  setBet,
  setDealer,
  setGame,
  setTruck,
} from "@store/reducers/gameSlice";
import { setPlayers } from "@store/reducers/playerSlice";
import { useFormValue } from "@hooks/useFormValue";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import sharedStyles from "../../styles/shared.module.scss";
import { IPlayer } from "@src/types/IPlayer";
import { TResult } from "@src/types/IGame";

interface Props {
  onClose: () => void;
}

export const NewResult: FC<Props> = ({ onClose }) => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  const dispatch = useAppDispatch();
  const { values, resetForm, handleChange } = useFormValue();
  const { players } = useAppSelector((state) => state.playerSlice);
  const {
    bet: { playerId, bet },
    game,
    game: { roundResult },
    dealer,
  } = useAppSelector((state) => state.gameSlice);
  const [checked, setChecked] = useState(false);
  const name = players?.find((player: IPlayer) => player.id === playerId)?.name;
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  function convertValuesToNumbers(obj: TResult) {
    for (let key in obj) {
      obj[key] = Number(obj[key]);
    }
    return obj;
  }

  const addResult = (event: FormEvent) => {
    event.preventDefault();
    if (values) {
      const numberValues = convertValuesToNumbers(values);
      const round: TResult = {
        ...numberValues,
        [playerId]: checked ? bet : -bet,
      };
      const lastResult: TResult = roundResult[roundResult.length - 1];
      const result: TResult = {};
      for (const key in lastResult) {
        if (lastResult.hasOwnProperty(key)) {
          if (round[key] === 0 && players[Number(key)].bolt === 2) {
            result[key] = Number(lastResult[key]) - 120;
          } else {
            result[key] = Number(lastResult[key]) + Number(round[key] || 0);
          }

          if (result[key] === 555) {
            result[key] = 0;
            dispatch(setTruck(true));
            setTimeout(() => {
              dispatch(setTruck(false));
            }, 4000);
          }
        }
      }
      const updatedPlayers = players.map((pl: IPlayer) => {
        if (round[pl.id] === 0) {
          if (pl.bolt >= 2) {
            return { ...pl, bolt: 0 };
          } else return { ...pl, bolt: pl.bolt + 1 };
        }
        return { ...pl, score: Number(result[pl.id]) };
      });
      dispatch(setPlayers(updatedPlayers));
      dispatch(setGame({ ...game, roundResult: [...roundResult, result] }));
      switch (dealer) {
        case 0:
          dispatch(setBet({ playerId: String(2), bet: 100 }));
          dispatch(setDealer(1));
          break;
        case 1:
          dispatch(setBet({ playerId: String(0), bet: 100 }));
          dispatch(setDealer(2));
          break;
        case 2:
          dispatch(setBet({ playerId: String(1), bet: 100 }));
          dispatch(setDealer(0));
          break;
        default:
          dispatch(setBet({ playerId: String(1), bet: 100 }));
          dispatch(setDealer(0));
          break;
      }
    }
    resetForm();
    onClose();
  };

  return (
    <form className={cx("form")} onSubmit={addResult}>
      <fieldset className={cxShared("fieldset")}>
        <FormControl>
          <FormLabel sx={{ fontSize: "16px", color: "black" }}>
            Ставка {name}: {bet}
          </FormLabel>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontSize: "12px" }}>Не взял</Typography>
            <Switch checked={checked} name="bet" onChange={handleChecked} />
            <Typography sx={{ fontSize: "12px" }}>Взял</Typography>
          </Stack>
        </FormControl>
        {players
          .filter((player: IPlayer) => player.id !== playerId)
          .map((player: IPlayer) => (
            <TextField
              key={player.id}
              name={player.id}
              label={player.name}
              value={values?.[player.id] || ""}
              onChange={handleChange}
              placeholder="Добавить результат"
              slotProps={{
                htmlInput: { type: "number", step: "5" },
              }}
              required
            />
          ))}
      </fieldset>
      <div className={cxShared("buttons")}>
        <Button onClick={onClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
