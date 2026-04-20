import Contact from "./contact.model.js";

class ContactService {
  async createContact(data) {
    return await Contact.create(data);
  }

  async getAllContacts(query = {}) {
    const { page = 1, limit = 10, sort = '-createdAt', read } = query;
    
    const filter = {};
    if (read !== undefined) filter.read = read === 'true';
    
    const contacts = await Contact.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Contact.countDocuments(filter);
    
    return {
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  async getContactById(id) {
    return await Contact.findById(id);
  }

  async markAsRead(id) {
    return await Contact.findByIdAndUpdate(
      id,
      { read: true, readAt: new Date() },
      { new: true }
    );
  }

  async markAsUnread(id) {
    return await Contact.findByIdAndUpdate(
      id,
      { read: false },
      { new: true }
    );
  }

  async markAsReplied(id) {
    return await Contact.findByIdAndUpdate(
      id,
      { replied: true, repliedAt: new Date() },
      { new: true }
    );
  }

  async deleteContact(id) {
    return await Contact.findByIdAndDelete(id);
  }

  async bulkDeleteContacts(ids) {
    return await Contact.deleteMany({ _id: { $in: ids } });
  }

  async getContactStats() {
    const total = await Contact.countDocuments();
    const read = await Contact.countDocuments({ read: true });
    const unread = await Contact.countDocuments({ read: false });
    const replied = await Contact.countDocuments({ replied: true });
    
    return { total, read, unread, replied };
  }
}

export default new ContactService();