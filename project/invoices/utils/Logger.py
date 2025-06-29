import logging


class Logger:

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s | %(name)s | %(levelname)s | %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    @classmethod
    def error(cls, name, message):
        logging.getLogger(name).error(message)


