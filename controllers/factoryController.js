// @desc    Get all items
// @route   GET /api/{resource}
// @access  Public
export const getAll = (model) => async (req, res, next) => {
    try {
        if (res.advancedResults) {
            return res.status(200).json(res.advancedResults);
        }
        
        const filter = {};
        if (req.query.active !== undefined) {
            filter.active = req.query.active === 'true';
        }
        if (req.query.featured !== undefined) {
            filter.featured = req.query.featured === 'true';
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const results = await model.find(filter).sort({ ordering: 1, createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single item by ID or Slug
// @route   GET /api/{resource}/:idOrSlug
// @access  Public
export const getOne = (model) => async (req, res, next) => {
    try {
        const param = req.params.id;
        let item;
        
        if (param.match(/^[0-9a-fA-F]{24}$/)) {
            item = await model.findById(param);
        } else {
            item = await model.findOne({ slug: param });
        }

        if (!item) {
            return res.status(404).json({
                success: false,
                error: `Resource not found with identifier of ${param}`,
                code: 404
            });
        }

        res.status(200).json({
            success: true,
            data: item,
            message: 'Operation successful'
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create item
// @route   POST /api/{resource}
// @access  Private
export const createOne = (model) => async (req, res, next) => {
    try {
        if (req.body.title || req.body.name) {
            const rawTitle = req.body.title || req.body.name || '';
            let generatedSlug = (req.body.slug || rawTitle).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            if (!generatedSlug) {
                generatedSlug = 'item-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            }
            req.body.slug = generatedSlug;
        }
        if (req.body.description && !req.body.shortDescription) {
            req.body.shortDescription = req.body.description;
        }
        if (req.body.shortDescription && !req.body.description) {
            req.body.description = req.body.shortDescription;
        }
        const item = await model.create(req.body);

        res.status(201).json({
            success: true,
            data: item,
            message: 'Resource created successfully'
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update item
// @route   PUT /api/{resource}/:id
// @access  Private
export const updateOne = (model) => async (req, res, next) => {
    try {
        let item = await model.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: `Resource not found with id of ${req.params.id}`,
                code: 404
            });
        }

        if (req.body.title || req.body.name) {
            const rawTitle = req.body.title || req.body.name || '';
            let generatedSlug = (req.body.slug || rawTitle).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            if (!generatedSlug) {
                generatedSlug = item.slug || ('item-' + Date.now() + '-' + Math.floor(Math.random() * 1000));
            }
            req.body.slug = generatedSlug;
        }

        if (req.body.description !== undefined) {
            req.body.shortDescription = req.body.description;
        } else if (req.body.shortDescription !== undefined) {
            req.body.description = req.body.shortDescription;
        }

        item = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: item,
            message: 'Resource updated successfully'
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete item
// @route   DELETE /api/{resource}/:id
// @access  Private
export const deleteOne = (model) => async (req, res, next) => {
    try {
        const item = await model.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: `Resource not found with id of ${req.params.id}`,
                code: 404
            });
        }

        await item.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Resource deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};
