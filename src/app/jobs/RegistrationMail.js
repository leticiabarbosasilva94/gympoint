import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, start_date, end_date, price } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula ativada',
      template: 'registration',
      context: {
        student: student.name,
        start_date: format(
          parseISO(start_date),
          "dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          { locale: pt }
        ),
        end_date: format(
          parseISO(end_date),
          "dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          { locale: pt }
        ),
        price: `R$ ${price.toFixed(2).replace('.', ',')}`
      }
    });
  }
}

export default new RegistrationMail();
