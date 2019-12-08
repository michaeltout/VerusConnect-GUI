import React from 'react';

export const CreateProfileRender = function() {
  const hasUsers = Object.keys(this.props.loadedUsers).length

  return (
    <form className="pre-auth-body-container">
      <h2 className="text-center">Create your profile:</h2>
      <div className="form-group">
        <input 
          name="profileName"
          className="border rounded form-control pre-auth-input" 
          type="text" 
          placeholder="Enter a profile name..."
          disabled={this.state.loading}
          onChange={this.updateInput}/>
      </div>
      <div className="form-group d-flex justify-content-between pre-auth-button-container">
        {hasUsers ? 
          <button 
            className="btn btn-primary pre-auth-button"
            disabled={this.state.loading}
            onClick={ this.cancel }>Cancel</button>
          :
          null
        }
        <button 
          className={`btn btn-primary ${hasUsers ? 'pre-auth-button' : 'pre-auth-button-single'}`}
          onClick={ this.validateFormData }
          disabled={this.state.loading}>Create</button>
      </div>
    </form>
  );
}


