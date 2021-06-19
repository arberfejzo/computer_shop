const Computer = require('../models/computers');

module.exports.index = async (req, res, next) => {
    const computers = await Computer.find({});
    res.render('computers/index', { computers })
}

module.exports.newComputer = (req, res) => {
    res.render('computers/new')
}

module.exports.createComputer = async (req, res, next) => {
    const computer = new Computer(req.body.computer);
    const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    computer.image = file.filename;
    await computer.save();
    req.flash('success', 'Successfully created a new campground')
    res.redirect('/computers')
}

module.exports.showComputer = async (req, res, next) => {
    const computer = await Computer.findById(req.params.id)
    res.render('computers/show', { computer });
}

module.exports.editComputer = async (req, res, next) => {
    const computer = await Computer.findById(req.params.id)
    if (!computer) {
        req.flash('error', 'Computer not found');
        return res.redirect('/computers');
    }
    res.render('computers/edit', { computer });
}

module.exports.updateComputer = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.body);
    const computer = await Computer.findByIdAndUpdate(id, { ...req.body.computer });
    /* const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs); */
    await computer.save();
    /* if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } }, { new: true })
    } */
    req.flash('success', 'Successfully updated campground');
    res.redirect('/computers')
}

module.exports.deleteComputer = async (req, res, next) => {
    const id = req.params.id;
    await Computer.findByIdAndRemove(id);
    req.flash('success', 'Computer deleted');
    res.redirect('/computers')
}