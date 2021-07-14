var data = {
    'Student Games': [
        {
            title: "Burger Lover",
            slug: "BurgerLover",
            description: "The best burger dating simulator where you play as Cherry the Tomato, an aspiring restaurant owner. Cherry lands herself a job at Burger Shack, a homey hole-in-the-ground restaurant owned by the ambitious and hardworking Bill the Burger. This game takes you on a journey where you make sandwiches, explore family trauma, and follow your dreams.",
            authors: "Anamika Sharif, Elisa  Xia, Ava Herrmann"
        },
        {
            title: "Starfall",
            slug: "Starfall",
            description: "Stars. Falling. Crazy. With rechargeable jumps, the Angel navigates to the earth below. Despite the colors and design, this game is deceivingly difficult. Don’t report bugs, they’re part of the experience. Try speedrunning<3\n\nBest Speedrunner: Ddog (36.37 seconds)",
            authors: "Coded by Lily Carras. Level Design and Additional Coding by Will Ergle. Art Direction by Maret McWhorter"
            
        },
        {
            title: "Game",
            slug: "Game",
            description: "Play as a lonely (poorly drawn) circle as he tries to escape the numerous projectiles flying towards him and live for a few seconds longer",
            authors: "Josh Blackmon, Titoluwa Alofe, Nathaniel Wasihun"
        },
        {
            title: "Battle Against the Gods/ Bob",
            slug: "BAtGB",
            description: "Your job is to go into the temple and defeat the boss within it, no questions asked. Nothing else is going on here so do not question it. The world is Earth hundreds of years after WWIII destroyed the world and many people rose up to control the people.",
            authors: "Andrew V. Manchiraju"
        },
        {
            title: "Gannos Tower Infiltration",
            slug: "GTI",
            description: "Infitrate the tower of Gannos as Lonk to save Zolda.",
            authors: "Brandon Hall, Douglas Mwangi"
        }
    ],
    'Personal Games': [
        {
            title: "The Lens",
            slug: "TheLens",
            description: "An educational physics game about gravitational lensing",
            authors: "Joshua Viszlai"
        }
    ]
};


var PortfolioItem = React.createClass({
    render: function () {
        return (
            <div className="col-sm-6 col-md-4">
                <div className="thumbnail">
                    <img src={"./images/" + this.props.slug + ".png"}/>
                    <div className="caption">
                        <h3><b>Title: </b> {this.props.title}<br/>
                            <b>Authors: </b>{this.props.authors}<br/>
                            <b>Description: </b>
                        </h3>
                        <h5>
                            {this.props.description}<br/>
                        </h5>
                        <p><a href={"./launcher.html#" + this.props.slug} className="btn btn-success" role="button">Play</a> <a href={"./binaries/" + this.props.slug + ".gba"} className="btn btn-primary" role="button">Download</a></p>
                    </div>
                </div>
            </div>
        );
    }
});

var PortfolioGroup = React.createClass({
    getInitialState: function () {
        return ({active: true});
    },
    render: function () {
        if (this.state.active) {
            var items = this.props.data.map(function (item, i) {
                return (
                    [<PortfolioItem key={i} title={item.title} slug={item.slug} authors={item.authors} description={item.description}></PortfolioItem>]
                );
            }, this);
            return (
                <div className="row">
                    <h2>{this.props.title}</h2>
                    {items}
                </div>
            );
        } else {
            return null;
        }
    }
})

var PortfolioFilters = React.createClass({
    updateFilter: function (name, event) {
        var active = event.target.checked;
        this.props.onChange(name, active);
    },
    render: function () {
        var boxes = this.props.groups.map(function (group, i) {
            return (
                <label key={i} className="checkbox-inline"><input type="checkbox" ref={group} name={group}
                                                                  defaultChecked={true}
                                                                  onChange={this.updateFilter.bind(null, group)}></input>{group}
                </label>
            );
        }, this);
        return (
            <div className="text-center">
                <h4>Filters: </h4>
                {boxes}
            </div>
        );
    }
})

var Portfolio = React.createClass({
    handleUpdate: function (group, active) {
        if (this.props.data[group] != null) {
            this.refs[group].setState({active: active})
        }
    },
    render: function () {
        var groupNames = [];
        var groups = [];
        for (var group in this.props.data) {
            if (this.props.data.hasOwnProperty(group)) {
                groupNames.push(group);
                groups.push(<PortfolioGroup key={group} ref={group} title={group}
                                            data={this.props.data[group]}></PortfolioGroup>)
            }
        }
        return (
            <div className="container"><PortfolioFilters groups={groupNames}
                                                         onChange={this.handleUpdate}></PortfolioFilters>
                <div>
                    {groups}
                </div>
            </div>
        );
    }
});

React.render(
    <Portfolio data={data}/>, document.getElementById("content")
);
