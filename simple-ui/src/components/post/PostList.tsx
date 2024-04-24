import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getPostList } from "../../apis/post";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9575cd",
    },
    background: {
      default: "#f3e5f5",
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "10px 20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          marginBottom: "10px",
        },
      },
    },
  },
});

const PostList = () => {
  const [rows, setRows] = useState<
    { id: number; title: string; userSeq: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPostList();
      setRows(result);
    };
    fetchData();
  }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "No" },
    { field: "title", headerName: "제목" },
    { field: "userSeq", headerName: "작성자" },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h5">
          게시글 리스트
        </Typography>
        <DataGrid rows={rows} columns={columns} hideFooter />
      </ThemeProvider>
    </Container>
  );
};

export default PostList;
