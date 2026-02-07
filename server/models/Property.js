import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['House', 'Apartment', 'Duplex', 'Villa', 'Penthouse', 'Townhouse', 'Studio', 'Commercial', 'Land', 'Office Space']
  },
  status: {
    type: String,
    required: [true, 'Please specify property status'],
    enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
    default: 'For Sale'
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    area: {
      type: String,
      required: [true, 'Please add an area/neighborhood']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  details: {
    bedrooms: {
      type: Number,
      required: [true, 'Please specify number of bedrooms'],
      min: 0
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please specify number of bathrooms'],
      min: 0
    },
    toilets: {
      type: Number,
      min: 0
    },
    parkingSpaces: {
      type: Number,
      default: 0,
      min: 0
    },
    size: {
      type: Number,
      required: [true, 'Please specify property size in square meters']
    },
    yearBuilt: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 1
    }
  },
  features: [{
    type: String
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    public_id: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  saves: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title
PropertySchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '-' + Date.now();
  }
  next();
});

// Virtual for property age
PropertySchema.virtual('propertyAge').get(function() {
  if (!this.details.yearBuilt) return null;
  
  const currentYear = new Date().getFullYear();
  const age = currentYear - this.details.yearBuilt;
  
  if (age === 0) return 'Brand New';
  if (age === 1) return '1 year old';
  return `${age} years old`;
});

export default mongoose.model('Property', PropertySchema);