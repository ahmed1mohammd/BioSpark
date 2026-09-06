import SiteContent from '../models/SiteContent.js';

// @desc    Get site content (Public)
// @route   GET /api/content
// @access  Public
export const getContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne({ key: 'main_content' });
    if (!content) {
      content = await SiteContent.create({ key: 'main_content' });
    }
    res.status(200).json({
      success: true,
      data: content,
      message: 'Site content retrieved'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update site content (Admin)
// @route   PUT /api/content
// @access  Private (Admin)
export const updateContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne({ key: 'main_content' });
    if (!content) {
      content = await SiteContent.create({ key: 'main_content', ...req.body });
    } else {
      content = await SiteContent.findOneAndUpdate(
        { key: 'main_content' },
        { $set: req.body },
        { new: true, runValidators: true }
      );
    }
    res.status(200).json({
      success: true,
      data: content,
      message: 'Site content updated successfully'
    });
  } catch (err) {
    next(err);
  }
};
