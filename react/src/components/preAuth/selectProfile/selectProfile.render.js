import React from 'react';

export const SelectProfileRender = function() {
  return (
    <form className="pre-auth-body-container">
      <h2 className="text-center">Select your profile:</h2>
      <select 
        defaultValue={ this.props.selectedUser } 
        name="selectedProfileId" 
        className="custom-select custom-select-lg" 
        onChange={this.updateSelection}>
        {Object.values(this.props.loadedUsers).map((user) => {
          return (
            <option 
              key={user.id} 
              value={user.id}>{user.name}</option>)
        })}
      </select>
      <div className="form-group">
        <div className="form-check input-and-checkbox-container">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="formCheck-1" 
            name="setAsDefaultUser"
            checked={this.state.setAsDefaultUser}
            onChange={this.updateCheckbox}/>
          <label className="form-check-label" htmlFor="formCheck-1">Launch into this profile next time</label>
        </div>
      </div>
      <div className="form-group d-flex justify-content-between">
        <button 
          className="btn btn-primary pre-auth-button"
          onClick={this.newProfile}>new profile</button>
        <button 
          className="btn btn-primary pre-auth-button"
          onClick={this.validateFormData}>select</button>
      </div>
    </form>
  );
}


