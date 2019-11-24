import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { student, question, answer, subject, mailText } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject,
      template: 'helporder',
      context: {
        student: student.name,
        question,
        answer,
        mailText
      }
    });
  }
}

export default new HelpOrderMail();
