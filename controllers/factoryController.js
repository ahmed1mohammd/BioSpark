// @desc    Get all items
// @route   GET /api/{resource}
// @access  Public (or Private depending on needs, user didn't specify for GET all)
export const getAll = (model) => async (req, res, next) => {
    try {
        console.log(`[Factory] Fetching all items for model: ${model.modelName}`);
        
        if (res.advancedResults) {
            console.log(`[Factory] Sending advanced results (Count: ${res.advancedResults.count})`);
            return res.status(200).json(res.advancedResults);
        }
        
        const results = await model.find();
        console.log(`[Factory] Sending fallback results (Count: ${results.length})`);
        
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (err) {
        console.error(`[Factory] Error in getAll for ${model.modelName}:`, err);
        next(err);
    }
};

// @desc    Get single item
// @route   GET /api/{resource}/:id
// @access  Public
export const getOne = (model) => async (req, res, next) => {
    try {
        const item = await model.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: `Resource not found with id of ${req.params.id}`,
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
