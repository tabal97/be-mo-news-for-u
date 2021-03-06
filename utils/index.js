const connection = require("../db/connection")

exports.checkAuthorExists = (username) => {
    return connection.first('*')
        .from('users')
        .where({ username })
        .then(author => {
            if (!author) return Promise.reject({ status: 404, msg: 'Author Does not Exist' })
            return true;
        })
}

exports.checkTopicExists = (slug) => {
    return connection.first('*')
        .from('topics')
        .where({ slug })
        .then(topic => {
            if (!topic) return Promise.reject({ status: 404, msg: 'Topic Does not Exist' })
            return true;
        })
}

exports.countTopics = () => {
    return connection.select('*')
        .from('topics')
        .then(topics => {
            return topics.length;
        })
}

exports.countArticles = (author, topic) => {
    return connection.select('*')
        .from('articles')
        .modify(currentQuery => {
            if (author) {
                currentQuery.where("articles.author", author)
            }
            if (topic) {
                currentQuery.where("articles.topic", topic)
            }
        })
        .then(articles => {
            return articles.length;
        })
}

exports.countUsers = () => {
    return connection.select('*')
        .from('users')
        .then(users => {
            return users.length;
        })
}

exports.countComments = () => {
    return connection.select('*')
        .from('comments')
        .then(comments => {
            return comments.length;
        })
}