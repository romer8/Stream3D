from tethys_sdk.base import TethysAppBase, url_map_maker


class Stream3D(TethysAppBase):
    """
    Tethys app class for Stream3D.
    """

    name = 'Stream3D'
    index = 'stream3d:home'
    icon = 'stream3d/images/icon.gif'
    package = 'stream3d'
    root_url = 'stream3d'
    color = '#2c3e50'
    description = ''
    tags = ''
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='stream3d',
                controller='stream3d.controllers.home'
            ),
        )

        return url_maps