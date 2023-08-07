const ArticleListItem = (article) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          height: "60%",
          display: "flex",
          justifyContent: "flex-start",
          textColor: "inherit",
          indicatorColor: "inherit",
        }}
      >
        <p>{article.tale_id}</p>
        {article.image && (
          <img src={article.image} style={{ marginLeft: "auto" }} />
        )}
      </Box>
      <hr style={{ marginBottom: "0px" }} />
    </React.Fragment>
  );
};

export default ArticleListItem;
