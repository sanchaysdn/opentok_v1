'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    mongoosePaginate = require('mongoose-paginate');

var UserSchema = mongoose.Schema({
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    email: {
        type: String,
        required:true
    },
    hash: {
         type: String,
    },
    salt: {
         type: String,
    },
    duoToken: {
        type: String,
    },
    duoVerified: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date
    },
    status: {
        type: Boolean,
        default:false
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
UserSchema.plugin(mongoosePaginate);

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, config.SECRET);
};

UserSchema.statics.getUserByUsername = function(username, callback) {
    User.findOne({
        username: username,
        /*status: {
            $ne: false
        },*/
        deleted: {
            $ne: true
        }
    }, function(err, userdata) {
        if (err) {
            callback(err);
        } else {
            if (userdata !== null) {
                callback(null, userdata)
            } else {
                callback('No user found');
            }
        }
    });
};

/**
 * [getUsers - To check user exist or not ]
 * @param  {object} username
 * @param  {object} email
 * @param  {object} id // on update case id will not be blank as well as on add case it will be blank
 * @return {json}
 */
UserSchema.statics.existCheck = function(username, email, id, callback) {
    var where = {
        $or: [{ username: new RegExp('^' + username + '$', "i") }, { email: new RegExp('^' + email + '$', "i") }],
        deleted: { $ne: true }
    };
    if (id) {
        where = {
            $or: [{ username: new RegExp('^' + username + '$', "i") }, { email: new RegExp('^' + email + '$', "i") }],
            deleted: { $ne: true },
            username: { $ne: config.ADMIN_USERNAME },
            _id: { $ne: id }
        };
    }
    User.findOne(where, function(err, userdata) {
        if (err) {
            callback(err)
        } else {
            if (userdata) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    });
};

/*
 * Get User Listing
 */
UserSchema.statics.getUsers = function(page, callback) {
    var sortBy = {},
        where = { deleted: false };

    sortBy.updatedAt = -1;
    return User.paginate(where, {
        page: page,
        limit: 1,
        populate: [{ path: 'group_id', select: 'title name', 'match': { name: { $ne: 'super_admin' } } }],
        sortBy: sortBy,
    }, callback);
};



UserSchema.statics.checkUserExist = function(email, userType, id, callback) {
    if (userType == 'driver') {
        var query = id == '' ? { username: email, deleted: false } : { username: email, deleted: false, driver_id: { $ne: id } }

    } else if (userType == 'owner') {
        var query = id == '' ? { username: email, deleted: false } : { username: email, deleted: false, owner_id: { $ne: id } }

    }
    User.findOne(query, function(err, driver) {
        if (err) {
            callback(err)
        } else {
            if (driver) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    })

}
var User = mongoose.model('User', UserSchema);