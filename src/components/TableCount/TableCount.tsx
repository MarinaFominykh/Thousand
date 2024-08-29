import { FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import BackHandIcon from "@mui/icons-material/BackHand";
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
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

type Round = {
  "0": number;
  "1": number;
  "2": number;
};

interface Props {
  results: Round[];
  //players: Player[];
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TableCount: FC<Props> = ({ results }) => {
  const cx = useStyles(styles);
  const { players } = useAppSelector((state) => state.playerSlice);
  const {
    dealer,
    bet: { bet },
  } = useAppSelector((state) => state.gameSlice);
  const [keeper100, setKeeper100] = useState(dealer + 1);

  useEffect(() => {
    setKeeper100(dealer + 1);
  }, [dealer]);

 
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {players.map((player: IPlayer, index: number) => (
              <StyledTableCell align="center" key={player.id}>
                <div className={cx("chell")}>
                  {player.name}
                  <div className={cx("image")}>
                    {keeper100 === index && bet <= 100 && <img src={hundred} />}
                    {dealer === index && <BackHandIcon fontSize="small" />}
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
  );
};
