const resolvers = {
    Query: {
        users: async () => {
        },
        user: async(_,{_id}) => {
        },
    },
    Mutation: {
        addUser: async(_, {username, email}) => {
        },
        login: async (_, {username, password}) => {
        },
    },
};

module.exports = resolvers;