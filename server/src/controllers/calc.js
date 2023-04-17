exports.addition = async (req, res) => {
  try {
    a = parseInt(req.params.num1) + parseInt(req.params.num2);
    sum = "" + a;
    res.send(sum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
