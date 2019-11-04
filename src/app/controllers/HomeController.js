class HomeController {
  index(req, res) {
    res.send('Home controller');
  }
}

export default new HomeController();
