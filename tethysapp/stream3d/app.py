from tethys_sdk.base import TethysAppBase, url_map_maker


class Stream3D(TethysAppBase):
    """
    Tethys app class for Stream3D.
    """

    name = 'Stream3D'
    index = 'stream3d:home'
    icon = 'stream3d/images/streammeLog.jpeg'
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
            UrlMap(
                name='instructions',
                url='stream3d/instructions',
                controller='stream3d.controllers.instructions'
            ),
            UrlMap(
                name='map',
                url='stream3d/map',
                controller='stream3d.controllers.map'
            ),
        )

        return url_maps
