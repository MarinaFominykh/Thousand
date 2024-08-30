import { FC, useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import BackHandIcon from "@mui/icons-material/BackHand";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import ModeIcon from "@mui/icons-material/Mode";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@hooks/redux";
import { IPlayer } from "@src/types/IPlayer";
import hundred from "@assets/svg/hundred.svg";
import { TResult } from "@src/types/IGame";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";

interface Props {
  results: TResult[];
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TableCount: FC<Props> = ({ results }) => {
  const cx = useStyles(styles);
  const ref = useRef<HTMLDivElement>(null);
  const { players } = useAppSelector((state) => state.playerSlice);
  const {
    dealer,
    bet: { bet },
    isTruck,
  } = useAppSelector((state) => state.gameSlice);
  const [keeper100, setKeeper100] = useState(dealer + 1);

  useEffect(() => {
    switch (dealer) {
      case 0:
        setKeeper100(1);
        break;
      case 1:
        setKeeper100(2);
        break;
      case 2:
        setKeeper100(0);
        break;
      default:
        setKeeper100(1);
    }
  }, [dealer]);
  useEffect(() => {
    if (isTruck) {
      ref.current?.classList.add("visible");
    } else {
      ref.current?.classList.remove("visible");
    }
  }, [isTruck]);

  return (
    <Paper
      sx={{ width: "100%", backgroundColor: "#f1f5fc", position: "relative" }}
      className={cx("table-container")}
    >
      <div className="truck-container" ref={ref}>
        <FireTruckIcon
          className="truck"
          color="primary"
          fontSize="large"
          sx={{ display: "none" }}
        />
      </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {players.map((player: IPlayer, index: number) => (
                <StyledTableCell
                  key={player.id}
                  className={cx("chell-container")}
                >
                  <div className={cx("chell")}>
                    <div className={cx("name-container")}>
                      <Typography variant="body2">{player.name}</Typography>
                      <div className={cx("image")}>
                        {keeper100 === index && bet <= 100 && (
                          <img src={hundred} />
                        )}
                        {dealer === index && (
                          <BackHandIcon sx={{ fontSize: "16px" }} />
                        )}
                      </div>
                    </div>
                    <div className={cx("bolt")}>
                      {Array.from(Array(player.bolt).keys()).map(
                        (_, itemId) => (
                          <ModeIcon key={itemId} sx={{ fontSize: "12px" }} />
                        )
                      )}
                    </div>
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((result, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell align="center">{result[0]}</StyledTableCell>
                <StyledTableCell align="center">{result[1]}</StyledTableCell>
                <StyledTableCell align="center">{result[2]}</StyledTableCell>
              </StyledTableRow>
            ))}
            {/* <StyledTableRow>
            {players.map((player: IPlayer) => (
              <StyledTableCell key={player.id} align="center">
                {player.score}
              </StyledTableCell>
            ))}
          </StyledTableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
