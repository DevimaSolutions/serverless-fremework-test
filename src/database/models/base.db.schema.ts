export const baseDbIdSchema = {
  id: {
    type: String,
    hashKey: true,
    index: true,
  },
};

export const baseDbTimestampsSchema = {
  timestamps: {
    createdAt: {
      createdAt: {
        type: {
          value: Date,
          settings: {
            storage: 'iso',
          },
        },
      },
    },
    updatedAt: {
      updatedAt: {
        type: {
          value: Date,
          settings: {
            storage: 'iso',
          },
        },
      },
    },
  },
};
