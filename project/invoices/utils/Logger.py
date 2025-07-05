import logging


class Logger:

    @classmethod
    def error(cls, name, message):
        logging.getLogger(name).error(message, stacklevel=2)


